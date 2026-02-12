# 🏠 Indian Home Loan Calculator

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff.svg)

**Professional Home Loan EMI Calculator with Tax Benefits, Prepayment Analysis & Export Features**

[Live Demo](#) | [Features](#-features) | [Installation](#-installation) | [Documentation](#-documentation)

</div>

---

## 📋 Overview

A modern, comprehensive Indian Home Loan Calculator built with React and Vite. Calculate EMI, analyze prepayment impact, compare interest rates, calculate tax benefits, and export detailed reports to PDF and Excel.

## ✨ Features

### 💰 Core Calculations
- **EMI Calculator** - Calculate monthly EMI with adjustable sliders
- **Amortization Schedule** - Year-wise principal vs interest breakdown
- **Processing Fee Calculator** - Factor in bank processing fees

### 🎯 Advanced Features
- **Prepayment Impact Analysis**
  - Reduce EMI or Reduce Tenure options
  - Calculate interest saved and years saved
  - See impact on total payment

- **Floating vs Fixed Interest Comparison**
  - Side-by-side comparison of both options
  - Total cost difference over loan tenure
  - EMI difference calculator

- **Tax Benefits Calculator (India Specific)**
  - Section 80C benefits (up to ₹1.5L on principal)
  - Section 24 benefits (up to ₹2L on interest)
  - Effective interest rate after tax benefits
  - Annual and total tax savings

- **Affordability Calculator**
  - Based on monthly income
  - Considers existing EMI obligations
  - Customizable expense ratio
  - Safe EMI range recommendations

### 📊 Data Visualization
- **Interactive Charts**
  - EMI breakdown pie chart
  - Year-wise principal vs interest bar chart
  - Balance over time line chart
  - Built with Recharts

### 📄 Export Features
- **PDF Export**
  - Complete loan summary
  - Tax benefits breakdown
  - Amortization schedule
  - Professional formatting

- **Excel Export**
  - Multiple sheets (Summary, Amortization, Comparison, Prepayment)
  - Formatted tables
  - Ready for further analysis

### 🎨 UI/UX Features
- **Dark/Light Mode** - Toggle between themes
- **Fully Responsive** - Works on mobile, tablet, and desktop
- **Modern Indian Theme** - Warm orange and teal colors
- **Smooth Animations** - Polished transitions and interactions
- **Professional Design** - Clean, intuitive interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/indian-home-loan-calculator.git

# Navigate to project directory
cd indian-home-loan-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📦 Tech Stack

- **Frontend Framework:** React 18.2
- **Build Tool:** Vite 5.0
- **Styling:** Tailwind CSS 3.4
- **Charts:** Recharts 2.10
- **Icons:** Lucide React 0.294
- **PDF Export:** jsPDF 2.5 + jsPDF-AutoTable 3.8
- **Excel Export:** SheetJS (xlsx) 0.18
- **Fonts:** Google Fonts (Montserrat, Inter)

## 🔧 Project Structure

```
indian-home-loan-calculator/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   └── favicon.svg             # App icon
├── src/
│   ├── App.jsx                 # Main calculator component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles with Tailwind
├── .gitignore
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🌐 Deployment

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

**Steps:**

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/indian-home-loan-calculator.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to **Pages** section
   - Under **Source**, select **GitHub Actions**

3. **Configure Base Path:**
   - Open `vite.config.js`
   - Update the `base` property to match your repository name:
     ```javascript
     base: '/your-repo-name/'
     ```

4. **Deploy:**
   - Push to `main` branch
   - GitHub Actions will automatically build and deploy
   - Your site will be live at: `https://yourusername.github.io/your-repo-name/`

### Alternative Deployment Options

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

## 📖 Usage Guide

### EMI Calculator
1. Adjust loan amount using the slider or input field
2. Set interest rate (annual percentage)
3. Choose loan tenure in years
4. View instant EMI calculation
5. See total interest and payment breakdown

### Prepayment Analysis
1. Navigate to **Prepayment** tab
2. Enter prepayment amount
3. Choose prepayment year
4. Select: Reduce Tenure OR Reduce EMI
5. View interest saved and years saved

### Tax Benefits
1. Go to **Tax Benefits** tab
2. Enter annual income
3. Select tax slab
4. View Section 80C and 24 benefits
5. See effective interest rate after tax

### Comparison Tool
1. Navigate to **Comparison** tab
2. Enter floating rate
3. Enter fixed rate
4. Compare EMI and total costs

### Affordability Check
1. Go to **Affordability** tab
2. Enter monthly income
3. Add existing EMI obligations
4. Set EMI-to-income ratio
5. View recommended loan amount

### Export Reports
- Click **Export PDF** for professional loan report
- Click **Export Excel** for detailed spreadsheet analysis

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#f97316',  // Orange
      secondary: '#0891b2', // Teal
    }
  }
}
```

### Modify Calculations

All calculation logic is in `src/App.jsx`:
- EMI formula: `calculateEMI()` function
- Tax benefits: `taxBenefits` useMemo
- Prepayment: `prepaymentImpact` useMemo
- Comparison: `comparison` useMemo

## 🔒 Security

- No backend - all calculations done client-side
- No data stored or transmitted
- No tracking or analytics (add if needed)
- Secure build process with automated deployment

## 📈 Performance

- Code splitting for optimal load times
- Lazy loading of components
- Optimized chart rendering
- Production build under 500KB gzipped

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and Vite
- Charts powered by Recharts
- Icons by Lucide
- Styled with Tailwind CSS

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Multi-language support (Hindi, Marathi)
- [ ] Bank-wise EMI comparison
- [ ] CIBIL impact estimator
- [ ] Save and share loan reports
- [ ] PWA support for offline use
- [ ] AI-powered interest rate predictions
- [ ] Integration with Indian bank APIs

---

<div align="center">

Made with ❤️ in India

**[⬆ Back to Top](#-indian-home-loan-calculator)**

</div>
