# 🚀 Complete Setup & Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [GitHub Repository Setup](#github-repository-setup)
4. [GitHub Pages Deployment](#github-pages-deployment)
5. [Alternative Deployments](#alternative-deployments)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - Should show: v18.x.x or higher

2. **Git**
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

3. **Code Editor** (recommended)
   - VS Code: https://code.visualstudio.com/

4. **GitHub Account**
   - Sign up at: https://github.com/

---

## Local Development Setup

### Step 1: Download/Clone the Project

**Option A: Download ZIP**
1. Download the project ZIP file
2. Extract to your desired location
3. Open terminal/command prompt in that folder

**Option B: Clone from GitHub**
```bash
git clone https://github.com/yourusername/indian-home-loan-calculator.git
cd indian-home-loan-calculator
```

### Step 2: Install Dependencies

Open terminal in project folder and run:

```bash
npm install
```

This will install all required packages. Wait for completion (2-5 minutes).

### Step 3: Run Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Open your browser and go to `http://localhost:3000`

### Step 4: Test the Application

- ✅ Try adjusting loan amount slider
- ✅ Switch between tabs (Calculator, Prepayment, etc.)
- ✅ Toggle dark/light mode
- ✅ Export PDF and Excel
- ✅ Check responsive design (resize browser)

---

## GitHub Repository Setup

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `indian-home-loan-calculator` (or your choice)
3. Description: "Professional Indian Home Loan Calculator"
4. Public or Private: Choose as needed
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Configure Project

**Important: Update vite.config.js**

Open `vite.config.js` and change the base path:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/indian-home-loan-calculator/', // ⚠️ Change to YOUR repo name
  // ... rest of config
})
```

**MUST MATCH** your GitHub repository name!

### Step 3: Initialize Git (if not already done)

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Indian Home Loan Calculator"

# Rename branch to main
git branch -M main
```

### Step 4: Connect to GitHub

Replace `yourusername` and `your-repo-name`:

```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
```

### Step 5: Push to GitHub

```bash
git push -u origin main
```

You'll be prompted for GitHub credentials.

---

## GitHub Pages Deployment

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Save

### Step 2: Verify Workflow

1. Go to **Actions** tab in your repository
2. You should see "Deploy to GitHub Pages" workflow running
3. Wait for green checkmark (2-3 minutes)

### Step 3: Access Your Live Site

Your calculator is now live at:

```
https://yourusername.github.io/your-repo-name/
```

Example:
```
https://johnsmith.github.io/indian-home-loan-calculator/
```

### Step 4: Verify Deployment

1. Open the live URL
2. Test all features
3. Check mobile responsiveness
4. Test dark/light mode
5. Try PDF/Excel export

---

## Automatic Deployments

### How It Works

Every time you push to the `main` branch:

1. GitHub Actions automatically triggers
2. Runs `npm install`
3. Builds the project (`npm run build`)
4. Deploys to GitHub Pages
5. Your site updates automatically (2-3 minutes)

### Making Updates

```bash
# Make your changes in code
# Then:

git add .
git commit -m "Updated feature X"
git push

# Wait 2-3 minutes, your site updates automatically!
```

---

## Alternative Deployments

### Vercel (Fastest & Easy)

1. Go to https://vercel.com/
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects Vite
6. Click "Deploy"
7. Done! Live in 2 minutes

**Advantages:**
- Instant deployments
- Automatic HTTPS
- Custom domain support
- No configuration needed

### Netlify

1. Go to https://netlify.com/
2. Sign in with GitHub
3. Click "Add new site" → "Import from Git"
4. Select your repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

**Advantages:**
- One-click rollbacks
- Form handling
- Serverless functions
- Split testing

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Select options:
# - Use existing project or create new
# - Public directory: dist
# - Single page app: Yes
# - GitHub integration: Yes (optional)

# Deploy
npm run build
firebase deploy
```

---

## Troubleshooting

### Issue: White screen after deployment

**Solution:**
1. Check `vite.config.js` - ensure `base` matches repo name
2. Rebuild: `npm run build`
3. Commit and push changes

### Issue: CSS not loading

**Solution:**
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Check browser console for errors
3. Verify Tailwind is installed: `npm list tailwindcss`

### Issue: GitHub Actions failing

**Solution:**
1. Go to Actions tab → Check error logs
2. Common fixes:
   - Enable GitHub Pages in Settings
   - Check `deploy.yml` syntax
   - Ensure `package.json` has all dependencies

### Issue: Charts not appearing

**Solution:**
1. Check Recharts installation: `npm list recharts`
2. If missing: `npm install recharts`
3. Clear `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Issue: Export features not working

**Solution:**
1. Check dependencies:
   ```bash
   npm list jspdf jspdf-autotable xlsx
   ```
2. Reinstall if needed:
   ```bash
   npm install jspdf jspdf-autotable xlsx
   ```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use different port
npm run dev -- --port 3001

# Or kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

---

## Custom Domain Setup (GitHub Pages)

### Step 1: Buy a Domain
- Namecheap, GoDaddy, Google Domains, etc.

### Step 2: Configure DNS
Add CNAME record:
```
Type: CNAME
Name: www
Value: yourusername.github.io
```

Add A records (GitHub IPs):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Step 3: Add to GitHub
1. Repository Settings → Pages
2. Custom domain: `www.yourdomain.com`
3. Save
4. Wait 24-48 hours for DNS propagation

---

## Performance Optimization

### Build Size Analysis

```bash
npm run build

# Check dist folder size
du -sh dist/
```

### Tips:
1. Use code splitting (already configured)
2. Lazy load components
3. Optimize images
4. Enable compression on server

---

## Getting Help

### Resources
- **React Documentation**: https://react.dev/
- **Vite Documentation**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Recharts**: https://recharts.org/

### Community Support
- Open an issue on GitHub
- Stack Overflow with tag `reactjs`
- Reddit: r/reactjs

---

## Next Steps

After successful deployment:

1. ✅ Add Google Analytics (optional)
2. ✅ Set up custom domain
3. ✅ Add more features from roadmap
4. ✅ Share with users for feedback
5. ✅ Star the repository on GitHub!

---

## Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Create production build
npm run preview      # Preview production build
npm run lint         # Check code quality

# Git
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub

# Deployment
# Push to main branch → Auto deploys via GitHub Actions
```

---

**Need more help?** Open an issue on GitHub!

**Happy Coding! 🚀**
