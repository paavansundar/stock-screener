# 📈 Stock Screener - User Guide

A professional-grade stock screening tool for Indian NSE/BSE markets with Bloomberg terminal aesthetics.

---

## 🚀 Getting Started

### Launch the Application
```bash
cd stock-screener
npm install
npm run dev
```
Open **http://localhost:3000** in your browser.

---

## 🎯 Quick Strategies (Preset Filters)

Located at the top of the left sidebar, these one-click presets instantly apply curated filter combinations:

| Preset | Description |
|--------|-------------|
| ⚡ **Momentum Picks** | High momentum stocks with bullish technicals, strong RSI (55-80), EMA crossover, and volume spikes |
| 📈 **Value Buys** | Undervalued stocks with low P/E (<20), high ROE (>15%), positive FCF, and strong fundamentals |
| 📊 **F&O Favorites** | High liquidity F&O stocks ideal for derivatives trading with balanced PCR |
| 👥 **FII Darlings** | Stocks with strong Foreign Institutional Investor interest and net buying activity |

**Tip:** Click any preset, then fine-tune individual filters as needed.

---

## 🔍 Filter Categories

### Asset Type (Top Filter Bar)
- **All** - View all 158 assets
- **Large Cap** - Top 50 blue-chip stocks (RELIANCE, TCS, INFY, etc.)
- **Mid Cap** - 50 mid-sized growth stocks
- **Small Cap** - 50 small-cap high-potential stocks
- **Commodities** - Gold, Silver, Crude Oil, Natural Gas, Copper, Aluminum
- **Currencies** - USD/INR, EUR/INR

---

### 📊 Technical Filters (Cyan)
| Filter | Description |
|--------|-------------|
| RSI Range | Relative Strength Index (0-100). Oversold <30, Overbought >70 |
| EMA Crossover | Exponential Moving Average signal (Bullish/Bearish/Neutral) |
| MACD Signal | Moving Average Convergence Divergence |
| Volume Spike | Minimum volume multiplier vs average (e.g., 1.5x) |
| Supertrend | Trend direction indicator |
| 52-Week Range | Position within yearly high-low range (%) |
| Bollinger Status | Price position relative to Bollinger Bands |

---

### 🏢 Fundamental Filters (Green)
| Filter | Description |
|--------|-------------|
| P/E Ratio | Price to Earnings ratio range |
| ROE Minimum | Return on Equity threshold (%) |
| Debt/Equity Max | Maximum leverage ratio |
| Revenue Growth | Minimum YoY revenue growth (%) |
| Promoter Holding | Minimum promoter stake (%) |
| FCF Positive | Filter for positive Free Cash Flow only |
| Market Cap | Large, Mid, Small cap filtering |

---

### 🌍 Macro Filters (Orange)
| Filter | Description |
|--------|-------------|
| FII Net Flow | Foreign Institutional Investor activity (Net Buyer/Seller/Neutral) |
| VIX Range | India VIX volatility level (Low/Medium/High) |
| Sector Sensitivity | Exposure to Crude/Rupee/Interest Rate movements |
| GDP Quartile | Economic cycle positioning |

---

### 💬 Sentiment Filters (Purple)
| Filter | Description |
|--------|-------------|
| PCR Range | Put-Call Ratio (0.5-1.5 typical range) |
| OI Buildup | Open Interest pattern (Long/Short/Covering/Unwinding) |
| Analyst Consensus | Broker ratings aggregation |
| Insider Activity | Recent insider buying/selling signals |

---

## 📋 Results Table

### Understanding the Columns

| Column | Description |
|--------|-------------|
| **Rank** | Overall ranking based on composite score |
| **Symbol** | NSE/BSE ticker symbol |
| **Price** | Current market price (₹) |
| **Change** | Daily change (% and absolute) |
| **Volume** | Trading volume with spike indicator |
| **Score** | Composite score out of 100 |
| **Tech** | Technical score (out of 25) |
| **Fund** | Fundamental score (out of 25) |
| **Macro** | Macro score (out of 20) |
| **Micro** | Micro/sector score (out of 15) |
| **Sent** | Sentiment score (out of 15) |
| **Signal** | Trading signal (Strong Buy → Strong Sell) |

### Score Breakdown (Total: 100)
- **Technical:** 25 points
- **Fundamental:** 25 points  
- **Macro:** 20 points
- **Micro:** 15 points
- **Sentiment:** 15 points

---

## 📊 Stock Detail Panel

**Click any stock row** to open the detail panel on the right side:

### Features:
1. **Mini Price Chart** - 30-day price movement visualization
2. **Radar/Spider Chart** - Visual representation of all 5 dimension scores
3. **Overall Score Circle** - Large score display with color coding
4. **Score Breakdown** - Individual dimension bars with values
5. **Key Metrics** - P/E, ROE, Volume, 52W Range at a glance
6. **Trading Signals** - RSI level and recommended action

**Close:** Click the X button or click outside the panel.

---

## 🔄 Real-Time Data

### Toggle Real-Time Mode
Use the **Real-Time toggle** in the top bar to enable live price updates.

- **ON:** Prices update every few seconds (simulated data)
- **OFF:** Static snapshot data

**Note:** The app uses simulated data that mimics real market behavior when external APIs are unavailable.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Esc` | Close detail panel |
| `R` | Reset all filters |

---

## 📱 Navigation

### Pagination
- Navigate through results using **Previous/Next** buttons
- View **20 stocks per page**
- Current position shown: "Showing X-Y of Z stocks"

### Sorting
- Click any **column header** to sort
- Click again to reverse sort order
- Default: Sorted by Score (descending)

---

## 🎨 Color Coding

### Price Changes
- 🟢 **Green:** Positive change (price up)
- 🔴 **Red:** Negative change (price down)

### Signal Indicators
- 🟢 **Strong Buy / Buy:** High conviction bullish
- 🟡 **Hold:** Neutral stance
- 🔴 **Sell / Strong Sell:** Bearish outlook

### Score Colors
- 🟢 **80-100:** Excellent
- 🟡 **60-79:** Good
- 🟠 **40-59:** Average
- 🔴 **0-39:** Poor

---

## 💡 Pro Tips

1. **Combine Presets with Manual Filters** - Start with a preset, then adjust specific parameters

2. **Use F&O Favorites for Options** - These stocks have high liquidity and tighter bid-ask spreads

3. **Monitor Volume Spikes** - Unusual volume often precedes big moves

4. **Check FII Activity** - Institutional flows often indicate smart money direction

5. **Watch the PCR** - Put-Call Ratio extremes can signal reversals
   - PCR < 0.7: Excessive bullishness (contrarian bearish)
   - PCR > 1.3: Excessive bearishness (contrarian bullish)

6. **Score Balance** - Look for stocks with balanced scores across all 5 dimensions, not just high total scores

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page | Refresh the browser, check console for errors |
| Data not loading | App uses simulation mode when APIs are unavailable |
| Slow performance | Reduce the number of active filters |
| Panel not opening | Click directly on a table row |

---

## 📊 Stock Universe

### Coverage: 158 Assets

- **50 Large Cap Stocks** - NIFTY 50 constituents
- **50 Mid Cap Stocks** - NIFTY Midcap selection
- **50 Small Cap Stocks** - High-potential small caps
- **6 Commodities** - Gold, Silver, Crude, Natural Gas, Copper, Aluminum
- **2 Currency Pairs** - USD/INR, EUR/INR

---

## 📝 Disclaimer

This tool is for **educational and informational purposes only**. It does not constitute financial advice. Always conduct your own research and consult with a qualified financial advisor before making investment decisions.

---

**Built with React + Vite** | **Dark Theme Bloomberg Aesthetic**
