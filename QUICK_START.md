# ⚡ Quick Start Guide (5 Minutes)

**Never used React or Git? No problem! Follow these simple steps.**

---

## 🎯 What You'll Need

1. A computer (Windows, Mac, or Linux)
2. 10 minutes of time
3. That's it!

---

## 📥 Step 1: Install Node.js (2 minutes)

### Windows or Mac:
1. Go to: https://nodejs.org/
2. Click the big green "Download" button (LTS version)
3. Run the installer
4. Click "Next" → "Next" → "Install"
5. Done!

### Verify Installation:
1. Open Terminal (Mac) or Command Prompt (Windows)
   - **Windows:** Press `Win + R`, type `cmd`, press Enter
   - **Mac:** Press `Cmd + Space`, type `terminal`, press Enter
2. Type: `node --version`
3. You should see something like: `v20.10.0`

✅ **Node.js installed successfully!**

---

## 📦 Step 2: Download the Project (1 minute)

### Option A: Download ZIP (Easiest)
1. Click the green "Code" button on GitHub
2. Click "Download ZIP"
3. Extract the ZIP file to a folder (like Desktop or Documents)
4. Remember where you saved it!

### Option B: Use Git (If you have it)
```bash
git clone https://github.com/yourusername/indian-home-loan-calculator.git
cd indian-home-loan-calculator
```

---

## 🚀 Step 3: Run the Project (2 minutes)

### Windows Instructions:
1. Open the project folder you extracted
2. Hold `Shift` and right-click in the empty space
3. Click "Open PowerShell window here" or "Open Command window here"
4. Type these commands one by one:

```bash
npm install
```
⏳ Wait 2-3 minutes (downloads required files)

```bash
npm run dev
```
🎉 Wait 10 seconds

5. You should see:
```
➜  Local:   http://localhost:3000/
```

6. Open your browser and go to: `http://localhost:3000`

### Mac Instructions:
1. Open Terminal
2. Type `cd ` (with a space)
3. Drag the project folder into Terminal
4. Press Enter
5. Type these commands:

```bash
npm install
```
⏳ Wait 2-3 minutes

```bash
npm run dev
```
🎉 Wait 10 seconds

6. Open browser: `http://localhost:3000`

---

## ✅ You're Running! What Now?

### Test the Calculator:
- Move the loan amount slider
- Try different interest rates
- Click different tabs (Prepayment, Comparison, Tax Benefits)
- Toggle Dark/Light mode (sun/moon icon)
- Export PDF and Excel

### Making Changes:
1. Open the project folder
2. Edit files in `src/` folder
3. Save the file
4. Your browser automatically refreshes!

---

## 🌐 Step 4: Put It Online (GitHub Pages)

### Create GitHub Account:
1. Go to: https://github.com/signup
2. Create account (free)
3. Verify your email

### Install GitHub Desktop (Easiest Way):
1. Go to: https://desktop.github.com/
2. Download and install
3. Sign in with your GitHub account

### Upload Your Project:
1. Open GitHub Desktop
2. Click "Add" → "Add Existing Repository"
3. Browse to your project folder
4. Click "Publish repository"
5. Name it: `indian-home-loan-calculator`
6. Click "Publish repository"

### Enable GitHub Pages:
1. Go to: https://github.com/yourusername/indian-home-loan-calculator
2. Click "Settings" (top right)
3. Click "Pages" (left sidebar)
4. Under "Source", select "GitHub Actions"
5. Wait 2-3 minutes

### Your Calculator is Live! 🎉
Visit: `https://yourusername.github.io/indian-home-loan-calculator/`

Share this link with anyone!

---

## 🛠️ Common Problems & Solutions

### Problem: "npm is not recognized"
**Solution:** You need to install Node.js (see Step 1)

### Problem: "Port 3000 is already in use"
**Solution:** 
- Close any programs using port 3000
- Or use a different port: `npm run dev -- --port 3001`

### Problem: White screen after deployment
**Solution:**
1. Open `vite.config.js`
2. Change this line:
   ```javascript
   base: '/indian-home-loan-calculator/',
   ```
   Make sure it matches your GitHub repository name EXACTLY

3. Save the file
4. In Terminal/Command Prompt:
   ```bash
   git add .
   git commit -m "Fix base path"
   git push
   ```
5. Wait 2-3 minutes, reload your website

### Problem: CSS not loading
**Solution:** 
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait for deployment to finish (check GitHub Actions tab)

---

## 📱 Using Your Calculator

### As a User:
1. Enter loan details
2. View EMI and breakdowns
3. Export PDF/Excel reports
4. Share with friends!

### As a Developer:
1. Edit `src/App.jsx` to change functionality
2. Edit `src/index.css` to change styles
3. Edit `tailwind.config.js` to change colors
4. Read `README.md` for detailed documentation

---

## 🎓 Next Steps

### Learn More:
- React Tutorial: https://react.dev/learn
- Tailwind CSS: https://tailwindcss.com/docs
- JavaScript: https://javascript.info/

### Add Features:
- Check `CONTRIBUTING.md` for ideas
- Check `CHANGELOG.md` for roadmap
- Check `README.md` for full documentation

---

## ❓ Need Help?

### Can't Figure Something Out?
1. Read error messages carefully
2. Google the error message
3. Check `SETUP_GUIDE.md` for detailed instructions
4. Ask on Stack Overflow
5. Open an issue on GitHub

### Useful Commands:
```bash
npm run dev      # Start development server
npm run build    # Create production files
npm run preview  # Test production build
```

---

## 🎉 Congratulations!

You've successfully:
- ✅ Set up a React development environment
- ✅ Run a modern web application
- ✅ Deployed to the internet
- ✅ Created something amazing!

**Share your calculator with the world! 🌍**

---

**Time taken:** 5-10 minutes  
**Difficulty:** Beginner-friendly  
**Cost:** $0 (completely free!)

---

**Questions?** Open an issue on GitHub or read the detailed guides:
- `README.md` - Main documentation
- `SETUP_GUIDE.md` - Detailed setup
- `CONTRIBUTING.md` - How to contribute
