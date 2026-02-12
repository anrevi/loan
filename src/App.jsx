import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calculator, TrendingDown, FileText, Sun, Moon, DollarSign, Home, CreditCard, PiggyBank } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function IndianHomeLoanCalculator() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('calculator');
  
  // Calculator inputs
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [processingFee, setProcessingFee] = useState(0.5);
  
  // Prepayment inputs
  const [prepaymentAmount, setPrepaymentAmount] = useState(0);
  const [prepaymentYear, setPrepaymentYear] = useState(5);
  const [prepaymentType, setPrepaymentType] = useState('reduceTenure');
  
  // Comparison inputs
  const [floatingRate, setFloatingRate] = useState(8.5);
  const [fixedRate, setFixedRate] = useState(9.0);
  
  // Tax inputs
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [taxSlab, setTaxSlab] = useState(30);
  
  // Affordability inputs
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [existingEMI, setExistingEMI] = useState(0);
  const [expenseRatio, setExpenseRatio] = useState(40);

  // EMI Calculation
  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                 (Math.pow(1 + monthlyRate, months) - 1);
    return emi;
  };

  // Main calculations
  const emi = useMemo(() => calculateEMI(loanAmount, interestRate, tenureYears), 
    [loanAmount, interestRate, tenureYears]);
  
  const totalPayment = emi * tenureYears * 12;
  const totalInterest = totalPayment - loanAmount;
  const processingFeeAmount = (loanAmount * processingFee) / 100;

  // Amortization Schedule
  const amortizationSchedule = useMemo(() => {
    const schedule = [];
    let balance = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    
    for (let month = 1; month <= tenureYears * 12; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;
      
      if (month % 12 === 0 || month === 1) {
        schedule.push({
          year: Math.ceil(month / 12),
          month: month,
          emi: emi,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
          totalPrincipal: loanAmount - balance,
          totalInterest: (emi * month) - (loanAmount - balance)
        });
      }
    }
    return schedule;
  }, [loanAmount, interestRate, tenureYears, emi]);

  // Prepayment calculations
  const prepaymentImpact = useMemo(() => {
    if (prepaymentAmount === 0) return null;
    
    let balance = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    let totalMonths = 0;
    let totalInterestPaid = 0;
    let prepaymentMade = false;
    
    for (let month = 1; month <= tenureYears * 12; month++) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = emi - interestPayment;
      
      // Apply prepayment
      if (!prepaymentMade && month === prepaymentYear * 12) {
        balance -= prepaymentAmount;
        prepaymentMade = true;
        
        if (prepaymentType === 'reduceEMI') {
          const remainingMonths = (tenureYears * 12) - month;
          const newEMI = calculateEMI(balance, interestRate, remainingMonths / 12);
          principalPayment = newEMI - interestPayment;
        }
      }
      
      balance -= principalPayment;
      totalInterestPaid += interestPayment;
      totalMonths++;
      
      if (balance <= 0) break;
    }
    
    const savedInterest = totalInterest - totalInterestPaid;
    const savedYears = (tenureYears * 12 - totalMonths) / 12;
    
    return {
      newTenure: totalMonths / 12,
      savedYears: savedYears,
      savedInterest: savedInterest,
      newTotalPayment: (emi * totalMonths) + prepaymentAmount
    };
  }, [loanAmount, interestRate, tenureYears, emi, prepaymentAmount, prepaymentYear, prepaymentType, totalInterest]);

  // Tax benefits calculation
  const taxBenefits = useMemo(() => {
    const yearlyPrincipal = Math.min(loanAmount / tenureYears, 150000); // 80C limit
    const yearlyInterest = Math.min(totalInterest / tenureYears, 200000); // 24 limit
    const totalDeduction = yearlyPrincipal + yearlyInterest;
    const taxSaved = totalDeduction * (taxSlab / 100);
    const effectiveRate = ((totalInterest - (taxSaved * tenureYears)) / loanAmount / tenureYears) * 100;
    
    return {
      principalDeduction: yearlyPrincipal,
      interestDeduction: yearlyInterest,
      totalDeduction: totalDeduction,
      taxSaved: taxSaved,
      effectiveRate: effectiveRate
    };
  }, [loanAmount, totalInterest, tenureYears, taxSlab]);

  // Floating vs Fixed comparison
  const comparison = useMemo(() => {
    const floatingEMI = calculateEMI(loanAmount, floatingRate, tenureYears);
    const fixedEMI = calculateEMI(loanAmount, fixedRate, tenureYears);
    
    return {
      floatingEMI,
      fixedEMI,
      floatingTotal: floatingEMI * tenureYears * 12,
      fixedTotal: fixedEMI * tenureYears * 12,
      difference: (fixedEMI - floatingEMI) * tenureYears * 12
    };
  }, [loanAmount, floatingRate, fixedRate, tenureYears]);

  // Affordability calculation
  const affordability = useMemo(() => {
    const maxEMI = (monthlyIncome - existingEMI) * (expenseRatio / 100);
    const maxLoan = (maxEMI * Math.pow(1 + (interestRate / 12 / 100), tenureYears * 12) * (12 / interestRate)) / 
                    (Math.pow(1 + (interestRate / 12 / 100), tenureYears * 12) - 1) * 100;
    
    return {
      maxEMI: maxEMI,
      maxLoan: maxLoan,
      safeEMIRange: [maxEMI * 0.8, maxEMI]
    };
  }, [monthlyIncome, existingEMI, expenseRatio, interestRate, tenureYears]);

  // Chart data
  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#f97316' },
    { name: 'Interest', value: totalInterest, color: '#0891b2' }
  ];

  const yearlyData = amortizationSchedule.map(item => ({
    year: item.year,
    principal: item.principal * 12,
    interest: item.interest * 12,
    balance: item.balance
  }));

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(15, 118, 110);
    doc.text('Indian Home Loan Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on ${new Date().toLocaleDateString('en-IN')}`, 105, 28, { align: 'center' });
    
    // Loan Summary
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Loan Summary', 14, 45);
    
    const summaryData = [
      ['Loan Amount', `₹${loanAmount.toLocaleString('en-IN')}`],
      ['Interest Rate', `${interestRate}%`],
      ['Loan Tenure', `${tenureYears} years`],
      ['Monthly EMI', `₹${emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`],
      ['Total Interest', `₹${totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`],
      ['Total Payment', `₹${totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`],
      ['Processing Fee', `₹${processingFeeAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`]
    ];
    
    doc.autoTable({
      startY: 50,
      head: [['Item', 'Value']],
      body: summaryData,
      theme: 'grid',
      headStyles: { fillColor: [15, 118, 110] }
    });
    
    // Tax Benefits
    doc.setFontSize(14);
    doc.text('Tax Benefits (Annual)', 14, doc.lastAutoTable.finalY + 15);
    
    const taxData = [
      ['Principal Deduction (80C)', `₹${taxBenefits.principalDeduction.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`],
      ['Interest Deduction (24)', `₹${taxBenefits.interestDeduction.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`],
      ['Total Deduction', `₹${taxBenefits.totalDeduction.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`],
      ['Tax Saved', `₹${taxBenefits.taxSaved.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`],
      ['Effective Interest Rate', `${taxBenefits.effectiveRate.toFixed(2)}%`]
    ];
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Benefit Type', 'Amount']],
      body: taxData,
      theme: 'grid',
      headStyles: { fillColor: [249, 115, 22] }
    });
    
    // New page for amortization
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Amortization Schedule (Yearly)', 14, 20);
    
    const amortData = amortizationSchedule.slice(0, 20).map(item => [
      item.year,
      `₹${item.principal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      `₹${item.interest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      `₹${item.balance.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
    ]);
    
    doc.autoTable({
      startY: 25,
      head: [['Year', 'Principal', 'Interest', 'Balance']],
      body: amortData,
      theme: 'striped',
      headStyles: { fillColor: [15, 118, 110] }
    });
    
    doc.save('home-loan-report.pdf');
  };

  // Export to Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Summary Sheet
    const summaryData = [
      ['Indian Home Loan Calculator Report'],
      ['Generated on', new Date().toLocaleDateString('en-IN')],
      [],
      ['Loan Details', ''],
      ['Loan Amount', loanAmount],
      ['Interest Rate', `${interestRate}%`],
      ['Tenure', `${tenureYears} years`],
      ['Processing Fee', `${processingFee}%`],
      [],
      ['EMI Details', ''],
      ['Monthly EMI', emi],
      ['Total Interest', totalInterest],
      ['Total Payment', totalPayment],
      ['Processing Fee Amount', processingFeeAmount],
      [],
      ['Tax Benefits (Annual)', ''],
      ['Principal Deduction (80C)', taxBenefits.principalDeduction],
      ['Interest Deduction (24)', taxBenefits.interestDeduction],
      ['Total Deduction', taxBenefits.totalDeduction],
      ['Tax Saved', taxBenefits.taxSaved],
      ['Effective Rate', `${taxBenefits.effectiveRate.toFixed(2)}%`]
    ];
    
    const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws1, 'Summary');
    
    // Amortization Sheet
    const amortHeaders = [['Year', 'Month', 'EMI', 'Principal', 'Interest', 'Balance', 'Total Principal', 'Total Interest']];
    const amortData = amortizationSchedule.map(item => [
      item.year,
      item.month,
      item.emi,
      item.principal,
      item.interest,
      item.balance,
      item.totalPrincipal,
      item.totalInterest
    ]);
    
    const ws2 = XLSX.utils.aoa_to_sheet([...amortHeaders, ...amortData]);
    XLSX.utils.book_append_sheet(wb, ws2, 'Amortization');
    
    // Comparison Sheet
    const comparisonData = [
      ['Floating vs Fixed Interest Comparison'],
      [],
      ['Type', 'Rate', 'EMI', 'Total Payment'],
      ['Floating', `${floatingRate}%`, comparison.floatingEMI, comparison.floatingTotal],
      ['Fixed', `${fixedRate}%`, comparison.fixedEMI, comparison.fixedTotal],
      [],
      ['Difference', '', comparison.fixedEMI - comparison.floatingEMI, comparison.difference]
    ];
    
    const ws3 = XLSX.utils.aoa_to_sheet(comparisonData);
    XLSX.utils.book_append_sheet(wb, ws3, 'Comparison');
    
    // Prepayment Sheet
    if (prepaymentImpact) {
      const prepaymentData = [
        ['Prepayment Impact Analysis'],
        [],
        ['Prepayment Amount', prepaymentAmount],
        ['Prepayment Year', prepaymentYear],
        ['Prepayment Type', prepaymentType],
        [],
        ['Results', ''],
        ['Original Tenure', `${tenureYears} years`],
        ['New Tenure', `${prepaymentImpact.newTenure.toFixed(2)} years`],
        ['Years Saved', `${prepaymentImpact.savedYears.toFixed(2)} years`],
        ['Interest Saved', prepaymentImpact.savedInterest],
        ['New Total Payment', prepaymentImpact.newTotalPayment]
      ];
      
      const ws4 = XLSX.utils.aoa_to_sheet(prepaymentData);
      XLSX.utils.book_append_sheet(wb, ws4, 'Prepayment');
    }
    
    XLSX.writeFile(wb, 'home-loan-calculator.xlsx');
  };

  const formatCurrency = (value) => {
    return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-teal-50'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-orange-100'} border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className={`${darkMode ? 'bg-gradient-to-br from-orange-500 to-teal-500' : 'bg-gradient-to-br from-orange-500 to-teal-600'} p-2 rounded-2xl`}>
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Indian Home Loan Calculator
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Professional Loan Analysis Tool</p>
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-orange-100 text-orange-600'} hover:scale-110 transition-transform`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className={`flex gap-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-2 rounded-2xl shadow-lg overflow-x-auto`}>
          {[
            { id: 'calculator', label: 'EMI Calculator', icon: Calculator },
            { id: 'prepayment', label: 'Prepayment', icon: TrendingDown },
            { id: 'comparison', label: 'Comparison', icon: FileText },
            { id: 'tax', label: 'Tax Benefits', icon: DollarSign },
            { id: 'affordability', label: 'Affordability', icon: PiggyBank }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? darkMode 
                    ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-lg'
                    : 'bg-gradient-to-r from-orange-500 to-teal-600 text-white shadow-lg'
                  : darkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Card */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Loan Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Loan Amount
                  </label>
                  <input
                    type="range"
                    min="100000"
                    max="50000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-orange-500 to-teal-500 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-48 font-bold text-lg`}
                    />
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>₹1L - ₹5Cr</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-orange-500 to-teal-500 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-32 font-bold text-lg`}
                    />
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>5% - 15%</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-orange-500 to-teal-500 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <input
                      type="number"
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-32 font-bold text-lg`}
                    />
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>1 - 30 years</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Processing Fee (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={processingFee}
                    onChange={(e) => setProcessingFee(Number(e.target.value))}
                    className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-full`}
                  />
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="space-y-6">
              <div className={`${darkMode ? 'bg-gradient-to-br from-orange-600 to-orange-700' : 'bg-gradient-to-br from-orange-500 to-orange-600'} rounded-3xl shadow-2xl p-8 text-white`}>
                <h3 className="text-lg font-medium mb-2 opacity-90">Monthly EMI</h3>
                <p className="text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {formatCurrency(emi)}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm opacity-80">Principal</p>
                    <p className="text-xl font-bold">{formatCurrency(loanAmount)}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm opacity-80">Interest</p>
                    <p className="text-xl font-bold">{formatCurrency(totalInterest)}</p>
                  </div>
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
                <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Payment Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Payment</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(totalPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Processing Fee</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(processingFeeAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Loan Tenure</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tenureYears} years ({tenureYears * 12} months)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={exportToPDF}
                  className={`flex-1 flex items-center justify-center gap-2 ${darkMode ? 'bg-teal-600 hover:bg-teal-700' : 'bg-teal-500 hover:bg-teal-600'} text-white rounded-xl px-6 py-3 font-medium transition-colors`}
                >
                  <Download className="w-5 h-5" />
                  Export PDF
                </button>
                <button
                  onClick={exportToExcel}
                  className={`flex-1 flex items-center justify-center gap-2 ${darkMode ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-500 hover:bg-orange-600'} text-white rounded-xl px-6 py-3 font-medium transition-colors`}
                >
                  <Download className="w-5 h-5" />
                  Export Excel
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prepayment' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Prepayment Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Prepayment Amount
                  </label>
                  <input
                    type="number"
                    value={prepaymentAmount}
                    onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                    className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-full`}
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Prepayment Year
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={tenureYears}
                    value={prepaymentYear}
                    onChange={(e) => setPrepaymentYear(Number(e.target.value))}
                    className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-full`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Prepayment Type
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setPrepaymentType('reduceTenure')}
                      className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                        prepaymentType === 'reduceTenure'
                          ? darkMode 
                            ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white'
                            : 'bg-gradient-to-r from-orange-500 to-teal-600 text-white'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Reduce Tenure
                    </button>
                    <button
                      onClick={() => setPrepaymentType('reduceEMI')}
                      className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                        prepaymentType === 'reduceEMI'
                          ? darkMode 
                            ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white'
                            : 'bg-gradient-to-r from-orange-500 to-teal-600 text-white'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Reduce EMI
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {prepaymentImpact && (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Prepayment Impact
                </h2>
                
                <div className="space-y-6">
                  <div className={`${darkMode ? 'bg-gradient-to-br from-teal-600 to-teal-700' : 'bg-gradient-to-br from-teal-500 to-teal-600'} rounded-2xl p-6 text-white`}>
                    <p className="text-sm opacity-80 mb-1">Interest Saved</p>
                    <p className="text-4xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {formatCurrency(prepaymentImpact.savedInterest)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-orange-50'} rounded-2xl p-4`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Original Tenure</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tenureYears} years</p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-teal-50'} rounded-2xl p-4`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>New Tenure</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prepaymentImpact.newTenure.toFixed(1)} years</p>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Years Saved</p>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                      {prepaymentImpact.savedYears.toFixed(1)} years
                    </p>
                  </div>

                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>New Total Payment</p>
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatCurrency(prepaymentImpact.newTotalPayment)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Floating vs Fixed Interest Comparison
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Floating Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={floatingRate}
                  onChange={(e) => setFloatingRate(Number(e.target.value))}
                  className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-full`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Fixed Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={fixedRate}
                  onChange={(e) => setFixedRate(Number(e.target.value))}
                  className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-full`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`${darkMode ? 'bg-gradient-to-br from-teal-600 to-teal-700' : 'bg-gradient-to-br from-teal-500 to-teal-600'} rounded-2xl p-6 text-white`}>
                <h3 className="text-lg font-medium mb-4 opacity-90">Floating Rate</h3>
                <p className="text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {formatCurrency(comparison.floatingEMI)}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="opacity-80">Rate</span>
                    <span className="font-bold">{floatingRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Total Payment</span>
                    <span className="font-bold">{formatCurrency(comparison.floatingTotal)}</span>
                  </div>
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gradient-to-br from-orange-600 to-orange-700' : 'bg-gradient-to-br from-orange-500 to-orange-600'} rounded-2xl p-6 text-white`}>
                <h3 className="text-lg font-medium mb-4 opacity-90">Fixed Rate</h3>
                <p className="text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {formatCurrency(comparison.fixedEMI)}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="opacity-80">Rate</span>
                    <span className="font-bold">{fixedRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Total Payment</span>
                    <span className="font-bold">{formatCurrency(comparison.fixedTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Difference Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>EMI Difference</span>
                  <span className={`text-xl font-bold ${comparison.difference > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {formatCurrency(Math.abs(comparison.fixedEMI - comparison.floatingEMI))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Cost Difference</span>
                  <span className={`text-xl font-bold ${comparison.difference > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {formatCurrency(Math.abs(comparison.difference))}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-4`}>
                  {comparison.difference > 0 
                    ? `Fixed rate will cost you ${formatCurrency(comparison.difference)} more over the loan tenure.`
                    : `Floating rate will cost you ${formatCurrency(Math.abs(comparison.difference))} more over the loan tenure.`
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tax' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Tax Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Annual Income
                  </label>
                  <input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-full`}
                    placeholder="Enter annual income"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tax Slab (%)
                  </label>
                  <select
                    value={taxSlab}
                    onChange={(e) => setTaxSlab(Number(e.target.value))}
                    className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-full`}
                  >
                    <option value="0">0% (No Tax)</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="30">30%</option>
                  </select>
                </div>

                <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-2xl p-6`}>
                  <h4 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tax Benefit Sections</h4>
                  <div className="space-y-2 text-sm">
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <strong>Section 80C:</strong> Principal repayment up to ₹1.5 Lakhs
                    </p>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <strong>Section 24:</strong> Interest payment up to ₹2 Lakhs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Annual Tax Benefits
              </h2>
              
              <div className="space-y-4">
                <div className={`${darkMode ? 'bg-gradient-to-br from-orange-600 to-orange-700' : 'bg-gradient-to-br from-orange-500 to-orange-600'} rounded-2xl p-6 text-white`}>
                  <p className="text-sm opacity-80 mb-1">Tax Saved Per Year</p>
                  <p className="text-5xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {formatCurrency(taxBenefits.taxSaved)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Principal (80C)</p>
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatCurrency(taxBenefits.principalDeduction)}
                    </p>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Interest (24)</p>
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatCurrency(taxBenefits.interestDeduction)}
                    </p>
                  </div>
                </div>

                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Deduction</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(taxBenefits.totalDeduction)}
                  </p>
                </div>

                <div className={`${darkMode ? 'bg-gradient-to-br from-teal-600 to-teal-700' : 'bg-gradient-to-br from-teal-500 to-teal-600'} rounded-2xl p-4 text-white`}>
                  <p className="text-sm opacity-80 mb-1">Effective Interest Rate</p>
                  <p className="text-3xl font-bold">
                    {taxBenefits.effectiveRate.toFixed(2)}%
                  </p>
                  <p className="text-xs opacity-75 mt-2">After tax benefits</p>
                </div>

                <div className={`${darkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-2xl p-4`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Total Tax Savings Over Loan Period</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {formatCurrency(taxBenefits.taxSaved * tenureYears)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'affordability' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Affordability Calculator
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Monthly Income
                  </label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-full`}
                    placeholder="Enter monthly income"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Existing EMI Obligations
                  </label>
                  <input
                    type="number"
                    value={existingEMI}
                    onChange={(e) => setExistingEMI(Number(e.target.value))}
                    className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg px-4 py-2 w-full`}
                    placeholder="Other loan EMIs"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    EMI to Income Ratio (%)
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    step="5"
                    value={expenseRatio}
                    onChange={(e) => setExpenseRatio(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-orange-500 to-teal-500 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{expenseRatio}%</span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {expenseRatio < 35 ? 'Conservative' : expenseRatio < 45 ? 'Moderate' : 'Aggressive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Your Affordability
              </h2>
              
              <div className="space-y-4">
                <div className={`${darkMode ? 'bg-gradient-to-br from-teal-600 to-teal-700' : 'bg-gradient-to-br from-teal-500 to-teal-600'} rounded-2xl p-6 text-white`}>
                  <p className="text-sm opacity-80 mb-1">Maximum Loan You Can Afford</p>
                  <p className="text-5xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {formatCurrency(affordability.maxLoan)}
                  </p>
                </div>

                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Maximum Safe EMI</p>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(affordability.maxEMI)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-orange-50'} rounded-2xl p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Monthly Income</p>
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatCurrency(monthlyIncome)}
                    </p>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-teal-50'} rounded-2xl p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Existing EMI</p>
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatCurrency(existingEMI)}
                    </p>
                  </div>
                </div>

                <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-2xl p-6`}>
                  <h4 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recommendation</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {affordability.maxEMI > emi 
                      ? `✅ Your current loan of ${formatCurrency(loanAmount)} is affordable. You can comfortably manage an EMI of ${formatCurrency(emi)}.`
                      : `⚠️ Your current loan of ${formatCurrency(loanAmount)} may be too high. Consider a loan of ${formatCurrency(affordability.maxLoan)} or less.`
                    }
                  </p>
                </div>

                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Available for EMI</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(monthlyIncome - existingEMI)}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                    After existing obligations
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              EMI Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${formatCurrency(entry.value)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Principal vs Interest (Yearly)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearlyData.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="year" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="principal" fill="#f97316" name="Principal" />
                <Bar dataKey="interest" fill="#0891b2" name="Interest" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Amortization Table */}
        <div className={`mt-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Amortization Schedule (Yearly)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <th className={`px-4 py-3 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Year</th>
                  <th className={`px-4 py-3 text-right text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>EMI</th>
                  <th className={`px-4 py-3 text-right text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Principal</th>
                  <th className={`px-4 py-3 text-right text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Interest</th>
                  <th className={`px-4 py-3 text-right text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {amortizationSchedule.map((row, index) => (
                  <tr key={index} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className={`px-4 py-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{row.year}</td>
                    <td className={`px-4 py-3 text-right ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(row.emi)}</td>
                    <td className={`px-4 py-3 text-right text-orange-600 font-medium`}>{formatCurrency(row.principal)}</td>
                    <td className={`px-4 py-3 text-right text-teal-600 font-medium`}>{formatCurrency(row.interest)}</td>
                    <td className={`px-4 py-3 text-right ${darkMode ? 'text-white' : 'text-gray-900'} font-bold`}>{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border-t mt-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2026 Indian Home Loan Calculator - Professional Financial Planning Tool
          </p>
        </div>
      </footer>
    </div>
  );
}
