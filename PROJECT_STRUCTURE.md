# 📁 Project Structure

Complete file structure and description for Indian Home Loan Calculator.

```
indian-home-loan-calculator/
│
├── 📂 .github/
│   └── 📂 workflows/
│       └── deploy.yml                 # GitHub Actions auto-deployment
│
├── 📂 public/                         # Static assets
│   ├── favicon.svg                    # App icon (house gradient)
│   ├── robots.txt                     # SEO robots file
│   └── sitemap.xml                    # SEO sitemap
│
├── 📂 src/                            # Source code
│   ├── App.jsx                        # Main calculator component (800+ lines)
│   ├── main.jsx                       # React entry point
│   └── index.css                      # Global styles + Tailwind
│
├── 📄 .eslintrc.cjs                   # ESLint configuration
├── 📄 .gitignore                      # Git ignore rules
│
├── 📄 index.html                      # HTML entry point with SEO
│
├── 📄 package.json                    # Dependencies & scripts
├── 📄 vite.config.js                  # Vite build configuration
├── 📄 tailwind.config.js              # Tailwind CSS config
├── 📄 postcss.config.js               # PostCSS config
│
├── 📄 README.md                       # Main documentation (comprehensive)
├── 📄 SETUP_GUIDE.md                  # Detailed setup instructions
├── 📄 QUICK_START.md                  # 5-minute beginner guide
├── 📄 CONTRIBUTING.md                 # Contribution guidelines
├── 📄 CHANGELOG.md                    # Version history
│
└── 📄 LICENSE                         # MIT License

```

---

## 📄 File Descriptions

### Configuration Files

#### `package.json`
- **Purpose:** Project dependencies and npm scripts
- **Key Dependencies:**
  - React 18.2 (UI framework)
  - Recharts 2.10 (Charts)
  - jsPDF 2.5 (PDF export)
  - xlsx 0.18 (Excel export)
  - Lucide React (Icons)
  - Tailwind CSS 3.4 (Styling)
  - Vite 5.0 (Build tool)

#### `vite.config.js`
- **Purpose:** Vite build configuration
- **Key Settings:**
  - Base path for GitHub Pages
  - Code splitting configuration
  - Production optimizations
  - Dev server settings (port 3000)

#### `tailwind.config.js`
- **Purpose:** Tailwind CSS customization
- **Customizations:**
  - Custom color scheme (orange/teal gradients)
  - Font families (Montserrat, Inter)
  - Custom animations
  - Dark mode support

#### `postcss.config.js`
- **Purpose:** PostCSS plugins
- **Plugins:**
  - Tailwind CSS processing
  - Autoprefixer for browser compatibility

#### `.eslintrc.cjs`
- **Purpose:** Code quality and linting rules
- **Rules:**
  - React best practices
  - Hook usage rules
  - Unused variable warnings

#### `.gitignore`
- **Purpose:** Files to exclude from Git
- **Excludes:**
  - node_modules/
  - dist/
  - .env files
  - Editor files
  - Build outputs

---

### Source Code

#### `src/App.jsx` (Main Component - 800+ lines)

**State Management:**
- Loan inputs (amount, rate, tenure, fees)
- Prepayment parameters
- Comparison rates
- Tax information
- Affordability metrics
- UI state (dark mode, active tab)

**Key Functions:**
```javascript
calculateEMI()           // Core EMI calculation
amortizationSchedule    // Monthly breakdown (useMemo)
prepaymentImpact        // Prepayment analysis (useMemo)
taxBenefits             // Tax deductions (useMemo)
comparison              // Rate comparison (useMemo)
affordability           // Loan eligibility (useMemo)
exportToPDF()           // PDF generation
exportToExcel()         // Excel generation
```

**Components:**
- Header with dark mode toggle
- Navigation tabs (5 sections)
- Calculator form with sliders
- Results cards with gradients
- Chart components (Pie, Bar, Line)
- Amortization table
- Export buttons

#### `src/main.jsx`
- React app initialization
- Mounts App component to DOM
- StrictMode wrapper

#### `src/index.css`
- Tailwind directives (@tailwind base/components/utilities)
- Custom scrollbar styles
- Range input styling
- Animation keyframes
- Print styles for PDF

---

### HTML & Assets

#### `index.html`
- **SEO Meta Tags:**
  - Description, keywords, author
  - Open Graph (Facebook)
  - Twitter Cards
  - Structured Data (JSON-LD)
- **Google Fonts:**
  - Montserrat (headings)
  - Inter (body text)
- **Title & Description** optimized for search

#### `public/favicon.svg`
- Custom house icon with gradient
- Orange to teal gradient
- SVG format (scalable)

#### `public/robots.txt`
- Allows all search engines
- Sitemap reference
- Crawl delay settings

#### `public/sitemap.xml`
- Single-page sitemap
- Update frequency: monthly
- Priority: 1.0

---

### GitHub Workflows

#### `.github/workflows/deploy.yml`
- **Triggers:** Push to main branch
- **Steps:**
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies (npm ci)
  4. Build project (npm run build)
  5. Deploy to GitHub Pages
- **Permissions:** Pages write access
- **Concurrency:** One deployment at a time

---

### Documentation Files

#### `README.md` (Main Documentation)
- **Sections:**
  - Overview with badges
  - Complete features list
  - Installation instructions
  - Tech stack details
  - Project structure
  - Deployment guides (4 platforms)
  - Usage guide for all features
  - Customization tips
  - Performance notes
  - Contributing info
  - License and support

#### `SETUP_GUIDE.md` (Detailed Setup)
- **Sections:**
  - Prerequisites checklist
  - Local development setup
  - GitHub repository creation
  - GitHub Pages deployment
  - Alternative deployments (Vercel, Netlify, Firebase)
  - Troubleshooting (10+ common issues)
  - Custom domain setup
  - Performance optimization
  - Quick reference commands

#### `QUICK_START.md` (Beginner Guide)
- **Sections:**
  - 5-minute setup for absolute beginners
  - Node.js installation (Windows/Mac)
  - Download project instructions
  - Run locally (step-by-step)
  - Deploy to GitHub Pages (visual guide)
  - Common problems & solutions
  - Next steps

#### `CONTRIBUTING.md` (Contribution Guide)
- **Sections:**
  - Code of conduct
  - How to contribute (bugs, features, PRs)
  - Development setup
  - Coding standards
  - Testing checklist
  - Documentation requirements
  - Project structure overview
  - Financial calculation guidelines
  - Recognition system

#### `CHANGELOG.md` (Version History)
- **Format:** Keep a Changelog standard
- **Current Version:** 1.0.0
- **Sections:**
  - Added features
  - Technical stack
  - Documentation
  - Deployment setup
- **Planned Features:** Roadmap for future versions

#### `LICENSE` (MIT License)
- Open source MIT license
- Free to use, modify, distribute
- Copyright 2026

---

## 📊 Code Statistics

```
Total Files:        20+
Total Lines:        ~3,000
Main Component:     800+ lines (App.jsx)
Documentation:      2,000+ lines
Languages:          JavaScript, JSX, CSS, HTML, YAML, Markdown
```

---

## 🔍 File Relationships

```
index.html
    └── loads src/main.jsx
            └── imports src/App.jsx
                    └── imports src/index.css
                            └── uses tailwind.config.js
                                    └── processed by postcss.config.js

vite.config.js
    └── configures build process
            └── outputs to dist/
                    └── deployed by .github/workflows/deploy.yml

package.json
    └── defines dependencies
            └── installed by npm
                    └── used by all components
```

---

## 🎯 Key Files for Customization

### Change Colors:
- `tailwind.config.js` - Theme colors
- `src/App.jsx` - Gradient classes

### Change Calculations:
- `src/App.jsx` - All calculation logic

### Change Text/Labels:
- `src/App.jsx` - All UI text
- `index.html` - Page title and meta

### Change Deployment:
- `vite.config.js` - Base path
- `.github/workflows/deploy.yml` - Deployment target

### Change Styling:
- `src/index.css` - Global styles
- `tailwind.config.js` - Theme config
- `src/App.jsx` - Component classes

---

## 📦 Build Output

After running `npm run build`:

```
dist/
├── index.html                    # Minified HTML
├── assets/
│   ├── index-[hash].js          # Main bundle
│   ├── react-vendor-[hash].js   # React dependencies
│   ├── charts-[hash].js         # Recharts
│   ├── export-[hash].js         # PDF/Excel libs
│   ├── icons-[hash].js          # Lucide icons
│   └── index-[hash].css         # Compiled CSS
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

**Total Size:** ~400-500 KB (gzipped)

---

## 🚀 Deployment Targets

This project structure supports:

1. **GitHub Pages** ✅ (Configured)
2. **Vercel** ✅ (Auto-detect)
3. **Netlify** ✅ (Auto-detect)
4. **Firebase Hosting** ✅ (Manual config)
5. **Any Static Host** ✅ (Upload dist/)

---

## 🔐 Security Notes

- ✅ No backend - client-side only
- ✅ No data storage
- ✅ No API keys required
- ✅ No user tracking
- ✅ No external dependencies at runtime

---

**Last Updated:** February 12, 2026
