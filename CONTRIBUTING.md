# Contributing to Indian Home Loan Calculator

First off, thank you for considering contributing to Indian Home Loan Calculator! It's people like you that make this tool better for everyone.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When submitting a bug report, include:**
- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, Node version)

**Example:**
```
Title: EMI calculation incorrect for tenure > 25 years

Steps to reproduce:
1. Set loan amount to ₹50,00,000
2. Set interest rate to 8.5%
3. Set tenure to 30 years
4. Check EMI value

Expected: ₹38,441
Actual: ₹40,000

Environment:
- OS: Windows 11
- Browser: Chrome 120
- Node: v20.10.0
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**Include in your suggestion:**
- Clear and descriptive title
- Detailed description of the enhancement
- Why this enhancement would be useful
- Possible implementation approach

### Pull Requests

1. **Fork the repository**
2. **Create a branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit** (`git commit -m 'Add some AmazingFeature'`)
6. **Push** (`git push origin feature/AmazingFeature`)
7. **Open a Pull Request**

## Development Process

### Setting Up Development Environment

```bash
# Clone your fork
git clone https://github.com/yourusername/indian-home-loan-calculator.git

# Navigate to directory
cd indian-home-loan-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Coding Standards

**JavaScript/React:**
- Use functional components and hooks
- Follow ESLint rules (run `npm run lint`)
- Use meaningful variable names
- Add comments for complex logic
- Keep components focused and reusable

**Styling:**
- Use Tailwind CSS utility classes
- Follow existing color scheme
- Ensure responsive design
- Test dark/light modes

**Commits:**
- Use clear, descriptive commit messages
- Present tense ("Add feature" not "Added feature")
- Reference issues when applicable

**Example commits:**
```
✅ Good:
- "Add prepayment calculator feature"
- "Fix EMI calculation for zero interest rate"
- "Improve mobile responsiveness in comparison tab"
- "Update README with deployment instructions"

❌ Bad:
- "fixed bug"
- "updates"
- "WIP"
- "asdf"
```

### Testing Your Changes

Before submitting PR:
- [ ] Code runs without errors (`npm run dev`)
- [ ] Production build works (`npm run build`)
- [ ] All calculations are accurate
- [ ] Responsive on mobile, tablet, desktop
- [ ] Dark and light modes work
- [ ] PDF export works
- [ ] Excel export works
- [ ] No console errors
- [ ] ESLint passes (`npm run lint`)

### Documentation

Update documentation if you:
- Add new features
- Change existing functionality
- Fix bugs
- Improve performance

Update:
- `README.md` - Main documentation
- `SETUP_GUIDE.md` - If setup process changes
- Code comments - For complex logic

## Project Structure

```
src/
├── App.jsx           # Main calculator component
│   ├── State management
│   ├── Calculation logic
│   ├── UI components
│   └── Export functions
├── main.jsx          # Entry point
└── index.css         # Global styles
```

### Key Functions to Know

**EMI Calculation:**
```javascript
const calculateEMI = (principal, rate, tenure) => {
  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
         (Math.pow(1 + monthlyRate, months) - 1);
};
```

**State Management:**
- Using React hooks (useState, useMemo)
- All state is local (no global state)
- Calculations trigger on state changes

**Export Logic:**
- PDF: jsPDF + jsPDF-AutoTable
- Excel: SheetJS (xlsx)

## Feature Requests We're Looking For

Priority features:
- [ ] Multi-language support (Hindi, Marathi)
- [ ] Bank comparison feature
- [ ] CIBIL score impact calculator
- [ ] Saving/sharing loan reports
- [ ] PWA support
- [ ] Print-friendly layouts
- [ ] Loan tenure in months option
- [ ] Part-payment schedule builder
- [ ] Insurance calculator integration

## Financial Calculation Guidelines

When working with financial calculations:

1. **Accuracy is critical** - Test thoroughly
2. **Use standard formulas** - Don't invent new ones
3. **Consider edge cases:**
   - Zero interest rate
   - Very short tenures (< 1 year)
   - Very long tenures (> 30 years)
   - Large loan amounts (> ₹10 Cr)
   - Prepayment > remaining balance

4. **Verify against:**
   - Bank EMI calculators
   - Financial websites (BankBazaar, PolicyBazaar)
   - Excel calculations

## Questions?

Feel free to:
- Open an issue for discussion
- Ask in pull request comments
- Reach out to maintainers

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Credited in commit history

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🙏**
