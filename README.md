# 📈 Stock Screener

A professional-grade stock screening application for Indian NSE/BSE markets with Bloomberg terminal-inspired dark theme aesthetics.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.21-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- **158 Assets** - Large Cap, Mid Cap, Small Cap stocks + Commodities & Currencies
- **5-Dimension Scoring** - Technical, Fundamental, Macro, Micro, Sentiment analysis
- **Quick Strategy Presets** - Momentum Picks, Value Buys, F&O Favorites, FII Darlings
- **Interactive Detail Panel** - Radar charts, mini price charts, score breakdowns
- **Real-Time Mode** - Simulated live price updates
- **Advanced Filters** - 20+ customizable filter parameters

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| **Node.js** | 18.x or higher | `node --version` |
| **npm** | 9.x or higher | `npm --version` |

### Installing Node.js

**Windows:**
```powershell
# Using winget
winget install OpenJS.NodeJS.LTS

# Or download from https://nodejs.org/
```

**macOS:**
```bash
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 🚀 Setup & Installation

### 1. Clone or Navigate to Project
```powershell
cd "c:\POC\capital markets\stock-screener"
```

### 2. Install Dependencies
```powershell
npm install
```

This will install:
- `react` & `react-dom` - UI framework
- `lucide-react` - Icon library
- `vite` - Build tool & dev server

---

## ▶️ Starting the Application

### Development Mode (with hot reload)
```powershell
npm run dev
```

**Output:**
```
VITE v5.4.21  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

Open **http://localhost:3000** in your browser.

### Production Build
```powershell
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ⏹️ Stopping the Application

### Method 1: Keyboard Shortcut (Recommended)
In the terminal where the app is running:
```
Ctrl + C
```
Then confirm with `Y` if prompted.

### Method 2: PowerShell Command
```powershell
# Stop all Node.js processes
Get-Process -Name node | Stop-Process -Force
```

### Method 3: Task Manager
1. Open Task Manager (`Ctrl + Shift + Esc`)
2. Find "Node.js JavaScript Runtime"
3. Click "End Task"

---

## 🔄 Restarting the Application

### Quick Restart (One Command)
```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force; npm run dev
```

### Full Clean Restart
```powershell
# Stop any running instance
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm install

# Start fresh
npm run dev
```

---

## 📁 Project Structure

```
stock-screener/
├── index.html              # Entry HTML file
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── README.md               # This file
├── USER_GUIDE.md           # Detailed usage guide
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main application component
    ├── index.css           # Global styles
    ├── components/
    │   ├── TopBar.jsx          # Header with search & controls
    │   ├── FilterSidebar.jsx   # Left sidebar filters
    │   ├── ResultsTable.jsx    # Stock data table
    │   └── StockDetailPanel.jsx # Right detail panel
    ├── data/
    │   └── stockData.js        # Stock definitions & filter options
    ├── services/
    │   └── realtimeDataService.js  # Real-time data simulation
    └── utils/
        └── scoringEngine.js    # Score calculation logic
```

---

## ⚙️ Configuration

### Change Port Number
Edit `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,        // Change this
    host: true,
    open: true
  }
})
```

### Environment Variables (Optional)
Create `.env` file in root:
```env
VITE_API_TIMEOUT=5000
VITE_UPDATE_INTERVAL=3000
```

---

## 🛠️ NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview production build locally |

---

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Find process using port 3000
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess

# Kill the process (replace PID)
Stop-Process -Id <PID> -Force
```

### Module Not Found Errors
```powershell
# Clear and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
```

### Blank Page / White Screen
1. Open browser DevTools (`F12`)
2. Check Console tab for errors
3. Try hard refresh: `Ctrl + Shift + R`

### Dependencies Issues
```powershell
# Update all packages
npm update

# Or reinstall specific package
npm install lucide-react@latest
```

---

## 📚 Additional Documentation

- **[USER_GUIDE.md](./USER_GUIDE.md)** - Detailed feature documentation
- **[Vite Documentation](https://vitejs.dev/)**
- **[React Documentation](https://react.dev/)**

---

## 📝 License

MIT License - Feel free to use and modify.

---

## 🤝 Support

For issues or questions, check the troubleshooting section above or review the console logs for specific error messages.

---

**Happy Screening! 📊**
