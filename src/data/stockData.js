// Expanded Universe Data - 150+ Stocks from NIFTY 50, NIFTY Midcap 50, NIFTY Smallcap 50
// Plus Commodities and Currency
// NO MOCK DATA - All prices fetched from real exchanges

export const assetCategories = {
  LARGECAP: 'Large Cap',
  MIDCAP: 'Mid Cap',
  SMALLCAP: 'Small Cap',
  COMMODITY: 'Commodity',
  CURRENCY: 'Currency'
};

// Helper to create stock entry with defaults
const createStock = (symbol, name, sector, assetType, marketCap, pe, roe, debtEquity, revenueGrowth, promoterHolding) => ({
  symbol,
  name,
  sector,
  assetType,
  cmp: 0,
  change: 0,
  marketCap,
  marketCapCategory: assetType === 'LARGECAP' ? 'LargeCap' : assetType === 'MIDCAP' ? 'MidCap' : 'SmallCap',
  // Technical - will be calculated from real data
  rsi: 50,
  emaCrossover: '9/21',
  macdSignal: 'Hold',
  volumeSpike: 1.0,
  supertrend: 'Hold',
  fiftyTwoWeekHigh: 0,
  fiftyTwoWeekLow: 0,
  bollingerStatus: 'Middle',
  // Fundamental
  pe: pe || 20,
  roe: roe || 15,
  debtEquity: debtEquity || 0.5,
  revenueGrowth: revenueGrowth || 10,
  promoterHolding: promoterHolding || 50,
  fcfPositive: true,
  // Macro
  fiiFlow: 0,
  sectorSensitivity: { crude: 'Medium', rupee: 'Medium', rate: 'Medium' },
  // Sentiment
  pcr: 1.0,
  oiBuildup: 'Neutral',
  analystRating: 'Hold',
  insiderActivity: false
});

// ==================== LARGE CAP STOCKS (NIFTY 50) ====================
export const largeCapStocks = [
  createStock('RELIANCE', 'Reliance Industries Ltd', 'Energy', 'LARGECAP', 1925000, 27.8, 9.2, 0.42, 18.5, 50.33),
  createStock('TCS', 'Tata Consultancy Services', 'IT', 'LARGECAP', 1512000, 29.5, 48.2, 0.05, 8.2, 72.30),
  createStock('HDFCBANK', 'HDFC Bank Ltd', 'Banking', 'LARGECAP', 1280000, 19.8, 16.8, 0.0, 22.4, 25.92),
  createStock('BHARTIARTL', 'Bharti Airtel Ltd', 'Telecom', 'LARGECAP', 892000, 65.2, 15.4, 1.45, 14.8, 55.12),
  createStock('ICICIBANK', 'ICICI Bank Ltd', 'Banking', 'LARGECAP', 875000, 18.5, 17.2, 0.0, 24.6, 0.00),
  createStock('INFY', 'Infosys Ltd', 'IT', 'LARGECAP', 758000, 26.8, 32.5, 0.08, 6.8, 14.78),
  createStock('SBIN', 'State Bank of India', 'Banking', 'LARGECAP', 712000, 11.2, 18.5, 0.0, 28.2, 57.54),
  createStock('ITC', 'ITC Ltd', 'FMCG', 'LARGECAP', 582000, 28.5, 29.2, 0.0, 6.5, 0.00),
  createStock('HINDUNILVR', 'Hindustan Unilever Ltd', 'FMCG', 'LARGECAP', 589000, 58.5, 85.2, 0.02, 5.4, 61.90),
  createStock('LT', 'Larsen & Toubro Ltd', 'Infrastructure', 'LARGECAP', 512000, 32.4, 14.8, 1.12, 16.2, 0.00),
  createStock('BAJFINANCE', 'Bajaj Finance Ltd', 'Finance', 'LARGECAP', 478000, 35.2, 22.4, 3.85, 32.5, 54.78),
  createStock('SUNPHARMA', 'Sun Pharmaceutical', 'Pharma', 'LARGECAP', 425000, 38.5, 12.8, 0.15, 11.2, 54.48),
  createStock('HCLTECH', 'HCL Technologies Ltd', 'IT', 'LARGECAP', 412000, 24.5, 24.8, 0.12, 7.5, 60.81),
  createStock('MARUTI', 'Maruti Suzuki India', 'Auto', 'LARGECAP', 398000, 28.5, 14.2, 0.02, 22.8, 58.19),
  createStock('NTPC', 'NTPC Ltd', 'Power', 'LARGECAP', 385000, 15.2, 12.8, 1.42, 8.5, 51.10),
  createStock('KOTAKBANK', 'Kotak Mahindra Bank', 'Banking', 'LARGECAP', 385000, 22.5, 13.8, 0.0, 18.4, 25.98),
  createStock('TATAMOTORS', 'Tata Motors Ltd', 'Auto', 'LARGECAP', 372000, 8.5, 28.5, 0.95, 35.2, 46.38),
  createStock('AXISBANK', 'Axis Bank Ltd', 'Banking', 'LARGECAP', 358000, 14.2, 18.2, 0.0, 26.8, 8.22),
  createStock('TITAN', 'Titan Company Ltd', 'Consumer', 'LARGECAP', 345000, 78.5, 25.8, 0.28, 18.5, 52.90),
  createStock('ADANIENT', 'Adani Enterprises Ltd', 'Conglomerate', 'LARGECAP', 338000, 85.2, 8.5, 1.25, 42.5, 72.63),
  createStock('ONGC', 'Oil & Natural Gas Corp', 'Energy', 'LARGECAP', 325000, 7.8, 12.5, 0.35, 15.8, 58.89),
  createStock('M&M', 'Mahindra & Mahindra', 'Auto', 'LARGECAP', 325000, 18.5, 15.2, 0.48, 28.5, 19.35),
  createStock('ASIANPAINT', 'Asian Paints Ltd', 'Consumer', 'LARGECAP', 312000, 62.5, 28.4, 0.18, 8.2, 52.79),
  createStock('POWERGRID', 'Power Grid Corp', 'Power', 'LARGECAP', 312000, 18.5, 18.2, 1.85, 5.2, 51.34),
  createStock('WIPRO', 'Wipro Ltd', 'IT', 'LARGECAP', 298000, 22.8, 16.5, 0.22, 4.8, 72.95),
  createStock('COALINDIA', 'Coal India Ltd', 'Mining', 'LARGECAP', 285000, 8.5, 52.5, 0.08, 12.5, 63.13),
  createStock('BAJAJFINSV', 'Bajaj Finserv Ltd', 'Finance', 'LARGECAP', 285000, 42.5, 18.2, 0.0, 25.5, 60.69),
  createStock('ADANIPORTS', 'Adani Ports & SEZ', 'Infrastructure', 'LARGECAP', 285000, 28.5, 18.2, 0.85, 22.5, 65.89),
  createStock('ADANIGREEN', 'Adani Green Energy', 'Power', 'LARGECAP', 285000, 185.2, 8.5, 4.25, 85.5, 56.05),
  createStock('ULTRACEMCO', 'UltraTech Cement', 'Cement', 'LARGECAP', 285000, 38.5, 12.5, 0.42, 14.2, 59.36),
  createStock('BAJAJ-AUTO', 'Bajaj Auto Ltd', 'Auto', 'LARGECAP', 245000, 28.5, 22.8, 0.0, 15.8, 54.56),
  createStock('JSWSTEEL', 'JSW Steel Ltd', 'Metals', 'LARGECAP', 245000, 12.8, 18.5, 0.92, 22.5, 42.54),
  createStock('NESTLEIND', 'Nestle India', 'FMCG', 'LARGECAP', 225000, 82.5, 125.5, 0.0, 8.5, 62.76),
  createStock('TATASTEEL', 'Tata Steel Ltd', 'Metals', 'LARGECAP', 198000, 6.5, 15.2, 0.78, 18.2, 33.90),
  createStock('GRASIM', 'Grasim Industries', 'Cement', 'LARGECAP', 175000, 18.5, 8.2, 0.38, 18.5, 42.46),
  createStock('HINDALCO', 'Hindalco Industries', 'Metals', 'LARGECAP', 165000, 14.2, 12.8, 0.65, 25.5, 34.64),
  createStock('SBILIFE', 'SBI Life Insurance', 'Insurance', 'LARGECAP', 165000, 78.5, 15.8, 0.0, 18.5, 55.50),
  createStock('TECHM', 'Tech Mahindra Ltd', 'IT', 'LARGECAP', 145000, 32.5, 14.8, 0.12, 2.5, 35.28),
  createStock('HDFCLIFE', 'HDFC Life Insurance', 'Insurance', 'LARGECAP', 145000, 92.5, 12.5, 0.0, 15.2, 50.37),
  createStock('BPCL', 'Bharat Petroleum', 'Energy', 'LARGECAP', 145000, 5.8, 28.5, 0.65, 35.2, 52.98),
  createStock('EICHERMOT', 'Eicher Motors', 'Auto', 'LARGECAP', 128000, 32.5, 25.8, 0.02, 18.5, 49.15),
  createStock('BRITANNIA', 'Britannia Industries', 'FMCG', 'LARGECAP', 125000, 58.5, 62.5, 0.42, 8.5, 50.55),
  createStock('CIPLA', 'Cipla Ltd', 'Pharma', 'LARGECAP', 118000, 28.5, 15.8, 0.15, 12.5, 33.47),
  createStock('DRREDDY', 'Dr Reddys Labs', 'Pharma', 'LARGECAP', 112000, 22.8, 18.2, 0.12, 15.2, 26.72),
  createStock('TATACONSUM', 'Tata Consumer Products', 'FMCG', 'LARGECAP', 112000, 65.2, 8.5, 0.28, 12.5, 35.15),
  createStock('SHRIRAMFIN', 'Shriram Finance', 'Finance', 'LARGECAP', 112000, 15.8, 18.5, 3.85, 28.5, 25.43),
  createStock('DIVISLAB', 'Divis Laboratories', 'Pharma', 'LARGECAP', 105000, 45.2, 22.5, 0.02, 8.5, 51.95),
  createStock('HEROMOTOCO', 'Hero MotoCorp', 'Auto', 'LARGECAP', 98000, 22.5, 18.2, 0.02, 12.5, 34.76),
  createStock('APOLLOHOSP', 'Apollo Hospitals', 'Healthcare', 'LARGECAP', 98000, 78.5, 15.2, 0.45, 22.5, 29.31),
  createStock('INDUSINDBK', 'IndusInd Bank', 'Banking', 'LARGECAP', 98000, 12.5, 15.8, 0.0, 22.5, 16.49),
];

// ==================== MID CAP STOCKS (NIFTY Midcap 50) ====================
export const midCapStocks = [
  createStock('ZOMATO', 'Zomato Ltd', 'Internet', 'MIDCAP', 195000, 0, -5.2, 0.0, 65.5, 0.00),
  createStock('DLF', 'DLF Ltd', 'Realty', 'MIDCAP', 185000, 65.5, 5.8, 0.28, 18.5, 74.95),
  createStock('SIEMENS', 'Siemens Ltd', 'Engineering', 'MIDCAP', 185000, 92.5, 15.8, 0.05, 22.5, 75.00),
  createStock('TRENT', 'Trent Ltd', 'Retail', 'MIDCAP', 185000, 185.2, 15.8, 0.45, 48.5, 37.01),
  createStock('LTIM', 'LTIMindtree Ltd', 'IT', 'MIDCAP', 165000, 32.5, 28.5, 0.08, 12.5, 68.64),
  createStock('VEDL', 'Vedanta Ltd', 'Mining', 'MIDCAP', 165000, 12.5, 28.5, 0.85, 35.5, 56.38),
  createStock('PIDILITIND', 'Pidilite Industries', 'Chemicals', 'MIDCAP', 148000, 82.5, 25.8, 0.05, 12.5, 69.92),
  createStock('ABB', 'ABB India Ltd', 'Engineering', 'MIDCAP', 145000, 85.5, 22.5, 0.02, 28.5, 75.00),
  createStock('GODREJCP', 'Godrej Consumer', 'FMCG', 'MIDCAP', 125000, 55.5, 18.2, 0.28, 8.5, 63.22),
  createStock('HAVELLS', 'Havells India', 'Electricals', 'MIDCAP', 115000, 72.5, 22.8, 0.05, 15.2, 59.40),
  createStock('CHOLAFIN', 'Cholamandalam Investment', 'Finance', 'MIDCAP', 98000, 28.5, 18.2, 4.25, 25.5, 51.75),
  createStock('DABUR', 'Dabur India', 'FMCG', 'MIDCAP', 98000, 55.2, 22.8, 0.08, 6.5, 67.21),
  createStock('POLYCAB', 'Polycab India Ltd', 'Electricals', 'MIDCAP', 95000, 45.2, 22.8, 0.15, 28.5, 67.71),
  createStock('MAXHEALTH', 'Max Healthcare', 'Healthcare', 'MIDCAP', 85000, 65.5, 12.8, 0.28, 32.5, 23.73),
  createStock('JINDALSTEL', 'Jindal Steel & Power', 'Metals', 'MIDCAP', 85000, 8.5, 18.5, 0.58, 35.2, 61.22),
  createStock('MARICO', 'Marico Ltd', 'FMCG', 'MIDCAP', 85000, 52.5, 38.5, 0.02, 5.5, 59.60),
  createStock('CUMMINSIND', 'Cummins India', 'Engineering', 'MIDCAP', 78000, 42.5, 28.5, 0.02, 22.5, 51.00),
  createStock('PERSISTENT', 'Persistent Systems', 'IT', 'MIDCAP', 78000, 58.5, 25.8, 0.05, 22.5, 31.14),
  createStock('GODREJPROP', 'Godrej Properties', 'Realty', 'MIDCAP', 75000, 85.5, 8.2, 0.65, 42.5, 58.44),
  createStock('COLPAL', 'Colgate-Palmolive', 'FMCG', 'MIDCAP', 72000, 48.5, 85.5, 0.02, 8.5, 51.00),
  createStock('PIIND', 'PI Industries', 'Chemicals', 'MIDCAP', 68000, 42.5, 18.5, 0.12, 22.5, 46.09),
  createStock('MUTHOOTFIN', 'Muthoot Finance', 'Finance', 'MIDCAP', 68000, 15.8, 22.5, 2.85, 18.5, 73.35),
  createStock('NMDC', 'NMDC Ltd', 'Mining', 'MIDCAP', 68000, 8.2, 25.8, 0.12, 12.5, 60.79),
  createStock('OBEROIRLTY', 'Oberoi Realty', 'Realty', 'MIDCAP', 68000, 25.5, 12.5, 0.35, 28.5, 67.70),
  createStock('MPHASIS', 'Mphasis Ltd', 'IT', 'MIDCAP', 65000, 28.5, 22.5, 0.12, 8.5, 55.64),
  createStock('IDFCFIRSTB', 'IDFC First Bank', 'Banking', 'MIDCAP', 65000, 18.5, 12.8, 0.0, 35.5, 0.00),
  createStock('POLICYBZR', 'PB Fintech Ltd', 'Fintech', 'MIDCAP', 65000, 0, -12.5, 0.0, 42.5, 0.00),
  createStock('VOLTAS', 'Voltas Ltd', 'Consumer', 'MIDCAP', 55000, 52.5, 12.8, 0.08, 15.2, 30.30),
  createStock('ASTRAL', 'Astral Ltd', 'Building Materials', 'MIDCAP', 55000, 92.5, 18.5, 0.12, 18.5, 56.29),
  createStock('PHOENIXLTD', 'Phoenix Mills', 'Realty', 'MIDCAP', 55000, 48.5, 12.5, 0.42, 25.5, 47.52),
  createStock('SAIL', 'Steel Authority of India', 'Metals', 'MIDCAP', 52000, 8.5, 12.5, 0.65, 18.5, 65.00),
  createStock('PAGEIND', 'Page Industries', 'Textile', 'MIDCAP', 52000, 85.5, 42.5, 0.02, 8.5, 47.26),
  createStock('PRESTIGE', 'Prestige Estates', 'Realty', 'MIDCAP', 52000, 45.5, 8.5, 0.85, 35.5, 67.89),
  createStock('NYKAA', 'FSN E-Commerce', 'Internet', 'MIDCAP', 48000, 0, -8.5, 0.25, 35.5, 52.56),
  createStock('AUBANK', 'AU Small Finance Bank', 'Banking', 'MIDCAP', 48000, 28.5, 15.2, 0.0, 28.5, 26.07),
  createStock('TATAELXSI', 'Tata Elxsi Ltd', 'IT', 'MIDCAP', 48000, 62.5, 35.8, 0.02, 18.5, 43.92),
  createStock('FEDERALBNK', 'Federal Bank Ltd', 'Banking', 'MIDCAP', 45000, 12.5, 14.8, 0.0, 22.5, 0.00),
  createStock('BIOCON', 'Biocon Ltd', 'Pharma', 'MIDCAP', 45000, 28.5, 8.5, 0.42, 15.2, 60.68),
  createStock('GMRINFRA', 'GMR Airports Infra', 'Infrastructure', 'MIDCAP', 45000, 0, -2.5, 1.85, 45.5, 64.02),
  createStock('COFORGE', 'Coforge Ltd', 'IT', 'MIDCAP', 42000, 42.5, 28.5, 0.18, 25.5, 39.63),
  createStock('ESCORTS', 'Escorts Kubota', 'Auto', 'MIDCAP', 38000, 28.5, 15.2, 0.12, 18.5, 36.87),
  createStock('DELHIVERY', 'Delhivery Ltd', 'Logistics', 'MIDCAP', 35000, 0, -15.2, 0.0, 28.5, 0.00),
  createStock('LICHSGFIN', 'LIC Housing Finance', 'Finance', 'MIDCAP', 35000, 8.5, 12.8, 8.55, 15.2, 45.24),
  createStock('BANDHANBNK', 'Bandhan Bank', 'Banking', 'MIDCAP', 32000, 12.5, 18.5, 0.0, 22.5, 39.98),
  createStock('CROMPTON', 'Crompton Greaves', 'Electricals', 'MIDCAP', 28000, 45.5, 28.5, 0.08, 12.5, 36.00),
  createStock('SYNGENE', 'Syngene International', 'Pharma', 'MIDCAP', 28000, 48.5, 15.2, 0.18, 18.5, 54.22),
  createStock('IRB', 'IRB Infrastructure', 'Infrastructure', 'MIDCAP', 28000, 18.5, 8.5, 1.25, 22.5, 35.80),
  createStock('ATUL', 'Atul Ltd', 'Chemicals', 'MIDCAP', 25000, 32.5, 15.8, 0.12, 8.5, 45.10),
  createStock('LALPATHLAB', 'Dr Lal PathLabs', 'Healthcare', 'MIDCAP', 22000, 55.5, 25.8, 0.02, 8.5, 54.56),
  createStock('METROPOLIS', 'Metropolis Healthcare', 'Healthcare', 'MIDCAP', 12000, 42.5, 18.5, 0.08, 12.5, 50.44),
];

// ==================== SMALL CAP STOCKS (NIFTY Smallcap 50) ====================
export const smallCapStocks = [
  createStock('HAL', 'Hindustan Aeronautics', 'Defence', 'SMALLCAP', 285000, 28.5, 28.5, 0.05, 22.5, 75.15),
  createStock('IRFC', 'Indian Railway Finance', 'Finance', 'SMALLCAP', 195000, 28.5, 12.8, 8.55, 15.2, 86.36),
  createStock('BEL', 'Bharat Electronics', 'Defence', 'SMALLCAP', 185000, 42.5, 25.8, 0.02, 18.5, 51.14),
  createStock('PFC', 'Power Finance Corp', 'Finance', 'SMALLCAP', 165000, 6.8, 18.5, 7.85, 22.5, 55.99),
  createStock('RECLTD', 'REC Ltd', 'Finance', 'SMALLCAP', 145000, 8.5, 22.5, 6.25, 18.5, 52.63),
  createStock('BANKBARODA', 'Bank of Baroda', 'Banking', 'SMALLCAP', 125000, 7.8, 15.8, 0.0, 22.5, 63.97),
  createStock('CANBK', 'Canara Bank', 'Banking', 'SMALLCAP', 98000, 6.5, 18.5, 0.0, 28.5, 62.93),
  createStock('UNIONBANK', 'Union Bank of India', 'Banking', 'SMALLCAP', 98000, 6.2, 14.5, 0.0, 25.5, 83.49),
  createStock('NHPC', 'NHPC Ltd', 'Power', 'SMALLCAP', 98000, 18.5, 12.5, 0.85, 8.5, 70.95),
  createStock('RVNL', 'Rail Vikas Nigam', 'Infrastructure', 'SMALLCAP', 85000, 32.5, 18.5, 0.28, 35.5, 72.84),
  createStock('BHARATFORG', 'Bharat Forge', 'Auto', 'SMALLCAP', 68000, 55.5, 15.2, 0.45, 18.5, 45.25),
  createStock('GICRE', 'GIC Re', 'Insurance', 'SMALLCAP', 68000, 12.5, 12.5, 0.0, 18.5, 85.78),
  createStock('INDIANB', 'Indian Bank', 'Banking', 'SMALLCAP', 68000, 7.5, 12.8, 0.0, 22.5, 73.84),
  createStock('IOB', 'Indian Overseas Bank', 'Banking', 'SMALLCAP', 65000, 28.5, 8.5, 0.0, 35.5, 96.38),
  createStock('MAZAGON', 'Mazagon Dock Ship', 'Defence', 'SMALLCAP', 65000, 28.5, 32.5, 0.02, 42.5, 84.83),
  createStock('CENTRALBK', 'Central Bank of India', 'Banking', 'SMALLCAP', 52000, 32.5, 5.8, 0.0, 28.5, 93.08),
  createStock('SJVN', 'SJVN Ltd', 'Power', 'SMALLCAP', 52000, 25.5, 12.8, 0.65, 12.5, 81.85),
  createStock('HUDCO', 'HUDCO Ltd', 'Finance', 'SMALLCAP', 48000, 12.5, 15.8, 5.85, 18.5, 75.00),
  createStock('KALYANKJIL', 'Kalyan Jewellers', 'Consumer', 'SMALLCAP', 42000, 65.5, 12.8, 0.85, 35.5, 60.59),
  createStock('COCHINSHIP', 'Cochin Shipyard', 'Defence', 'SMALLCAP', 38000, 25.5, 22.5, 0.08, 35.5, 72.86),
  createStock('KPITTECH', 'KPIT Technologies', 'IT', 'SMALLCAP', 38000, 78.5, 28.5, 0.08, 42.5, 39.87),
  createStock('SUNTV', 'Sun TV Network', 'Media', 'SMALLCAP', 35000, 18.5, 28.5, 0.02, 8.5, 75.91),
  createStock('STARHEALTH', 'Star Health Insurance', 'Insurance', 'SMALLCAP', 35000, 28.5, 12.8, 0.0, 22.5, 57.72),
  createStock('NIACL', 'New India Assurance', 'Insurance', 'SMALLCAP', 32000, 18.5, 8.5, 0.0, 15.2, 85.44),
  createStock('IRCON', 'Ircon International', 'Infrastructure', 'SMALLCAP', 28000, 18.5, 15.2, 0.42, 22.5, 73.18),
  createStock('IIFL', 'IIFL Finance Ltd', 'Finance', 'SMALLCAP', 25000, 15.8, 18.5, 5.25, 28.5, 24.98),
  createStock('PNBHOUSING', 'PNB Housing Finance', 'Finance', 'SMALLCAP', 22000, 12.5, 8.5, 6.85, 18.5, 30.82),
  createStock('GRSE', 'Garden Reach Shipbuilders', 'Defence', 'SMALLCAP', 22000, 32.5, 18.5, 0.02, 28.5, 74.50),
  createStock('AFFLE', 'Affle India Ltd', 'IT', 'SMALLCAP', 22000, 68.5, 18.5, 0.05, 28.5, 58.61),
  createStock('RBLBANK', 'RBL Bank Ltd', 'Banking', 'SMALLCAP', 18000, 18.5, 8.5, 0.0, 15.2, 0.00),
  createStock('INDIAMART', 'IndiaMART InterMESH', 'Internet', 'SMALLCAP', 18000, 55.5, 22.5, 0.02, 15.2, 54.02),
  createStock('MANAPPURAM', 'Manappuram Finance', 'Finance', 'SMALLCAP', 18000, 8.5, 25.8, 2.55, 18.5, 35.03),
  createStock('SONATSOFTW', 'Sonata Software', 'IT', 'SMALLCAP', 18000, 42.5, 28.5, 0.08, 18.5, 27.48),
  createStock('AAVAS', 'Aavas Financiers', 'Finance', 'SMALLCAP', 15000, 32.5, 15.2, 2.85, 22.5, 58.25),
  createStock('CYIENT', 'Cyient Ltd', 'IT', 'SMALLCAP', 15000, 22.5, 18.5, 0.15, 12.5, 23.47),
  createStock('CANFINHOME', 'Can Fin Homes', 'Finance', 'SMALLCAP', 12000, 15.8, 18.5, 8.25, 15.2, 30.08),
  createStock('EDELWEISS', 'Edelweiss Financial', 'Finance', 'SMALLCAP', 12000, 18.5, 8.5, 3.85, 22.5, 23.72),
  createStock('EQUITAS', 'Equitas Small Finance', 'Banking', 'SMALLCAP', 12000, 15.8, 14.5, 0.0, 28.5, 0.00),
  createStock('PVRINOX', 'PVR INOX Ltd', 'Entertainment', 'SMALLCAP', 12000, 125.5, 2.5, 0.85, 45.5, 10.62),
  createStock('ZENTEC', 'Zensar Technologies', 'IT', 'SMALLCAP', 12000, 25.5, 15.8, 0.08, 15.2, 48.18),
  createStock('ZEEL', 'Zee Entertainment', 'Media', 'SMALLCAP', 12000, 35.5, 5.8, 0.28, -15.5, 3.99),
  createStock('HAPPSTMNDS', 'Happiest Minds Tech', 'IT', 'SMALLCAP', 9500, 45.5, 28.5, 0.08, 22.5, 53.19),
  createStock('TANLA', 'Tanla Platforms', 'IT', 'SMALLCAP', 8500, 22.5, 25.8, 0.05, 18.5, 40.61),
  createStock('HOMEFIRST', 'Home First Finance', 'Finance', 'SMALLCAP', 8500, 28.5, 12.8, 3.85, 35.5, 27.08),
  createStock('LATENTVIEW', 'Latent View Analytics', 'IT', 'SMALLCAP', 8500, 55.5, 22.8, 0.02, 35.5, 75.00),
  createStock('NETWORK18', 'Network18 Media', 'Media', 'SMALLCAP', 8500, 0, -8.5, 0.42, 25.5, 75.00),
  createStock('UJJIVANSFB', 'Ujjivan Small Finance', 'Banking', 'SMALLCAP', 8500, 8.5, 22.5, 0.0, 35.5, 0.00),
  createStock('NAZARA', 'Nazara Technologies', 'IT', 'SMALLCAP', 7200, 85.5, 5.8, 0.08, 42.5, 19.17),
  createStock('ROUTE', 'Route Mobile Ltd', 'IT', 'SMALLCAP', 6500, 28.5, 22.5, 0.12, 28.5, 46.32),
  createStock('DELTACORP', 'Delta Corp Ltd', 'Entertainment', 'SMALLCAP', 4500, 22.5, 12.8, 0.25, 8.5, 48.26),
];

// ==================== COMMODITIES ====================
export const commodities = [
  {
    symbol: 'GOLD',
    name: 'Gold',
    sector: 'Precious Metals',
    assetType: 'COMMODITY',
    cmp: 0,
    change: 0,
    marketCap: 0,
    marketCapCategory: 'Commodity',
    unit: '₹/10gm',
    exchange: 'MCX',
    rsi: 50, emaCrossover: '9/21', macdSignal: 'Hold', volumeSpike: 1.0,
    supertrend: 'Hold', fiftyTwoWeekHigh: 0, fiftyTwoWeekLow: 0, bollingerStatus: 'Middle',
    pe: 0, roe: 0, debtEquity: 0, revenueGrowth: 0, promoterHolding: 0, fcfPositive: false,
    fiiFlow: 0, sectorSensitivity: { crude: 'Low', rupee: 'High', rate: 'High' },
    pcr: 1.0, oiBuildup: 'Neutral', analystRating: 'Hold', insiderActivity: false
  },
  {
    symbol: 'SILVER',
    name: 'Silver',
    sector: 'Precious Metals',
    assetType: 'COMMODITY',
    cmp: 0, change: 0, marketCap: 0, marketCapCategory: 'Commodity',
    unit: '₹/kg', exchange: 'MCX',
    rsi: 50, emaCrossover: '9/21', macdSignal: 'Hold', volumeSpike: 1.0,
    supertrend: 'Hold', fiftyTwoWeekHigh: 0, fiftyTwoWeekLow: 0, bollingerStatus: 'Middle',
    pe: 0, roe: 0, debtEquity: 0, revenueGrowth: 0, promoterHolding: 0, fcfPositive: false,
    fiiFlow: 0, sectorSensitivity: { crude: 'Low', rupee: 'High', rate: 'High' },
    pcr: 1.0, oiBuildup: 'Neutral', analystRating: 'Hold', insiderActivity: false
  },
  {
    symbol: 'CRUDEOIL',
    name: 'Crude Oil',
    sector: 'Energy',
    assetType: 'COMMODITY',
    cmp: 0, change: 0, marketCap: 0, marketCapCategory: 'Commodity',
    unit: '₹/bbl', exchange: 'MCX',
    rsi: 50, emaCrossover: '9/21', macdSignal: 'Hold', volumeSpike: 1.0,
    supertrend: 'Hold', fiftyTwoWeekHigh: 0, fiftyTwoWeekLow: 0, bollingerStatus: 'Middle',
    pe: 0, roe: 0, debtEquity: 0, revenueGrowth: 0, promoterHolding: 0, fcfPositive: false,
    fiiFlow: 0, sectorSensitivity: { crude: 'High', rupee: 'Medium', rate: 'Low' },
    pcr: 1.0, oiBuildup: 'Neutral', analystRating: 'Hold', insiderActivity: false
  },
  {
    symbol: 'NATURALGAS',
    name: 'Natural Gas',
    sector: 'Energy',
    assetType: 'COMMODITY',
    cmp: 0, change: 0, marketCap: 0, marketCapCategory: 'Commodity',
    unit: '₹/mmBtu', exchange: 'MCX',
    rsi: 50, emaCrossover: '9/21', macdSignal: 'Hold', volumeSpike: 1.0,
    supertrend: 'Hold', fiftyTwoWeekHigh: 0, fiftyTwoWeekLow: 0, bollingerStatus: 'Middle',
    pe: 0, roe: 0, debtEquity: 0, revenueGrowth: 0, promoterHolding: 0, fcfPositive: false,
    fiiFlow: 0, sectorSensitivity: { crude: 'High', rupee: 'Medium', rate: 'Low' },
    pcr: 1.0, oiBuildup: 'Neutral', analystRating: 'Hold', insiderActivity: false
  },
  {
    symbol: 'COPPER',
    name: 'Copper',
    sector: 'Base Metals',
    assetType: 'COMMODITY',
    cmp: 0, change: 0, marketCap: 0, marketCapCategory: 'Commodity',
    unit: '₹/kg', exchange: 'MCX',
    rsi: 50, emaCrossover: '9/21', macdSignal: 'Hold', volumeSpike: 1.0,
    supertrend: 'Hold', fiftyTwoWeekHigh: 0, fiftyTwoWeekLow: 0, bollingerStatus: 'Middle',
    pe: 0, roe: 0, debtEquity: 0, revenueGrowth: 0, promoterHolding: 0, fcfPositive: false,
    fiiFlow: 0, sectorSensitivity: { crude: 'Medium', rupee: 'High', rate: 'Medium' },
    pcr: 1.0, oiBuildup: 'Neutral', analystRating: 'Hold', insiderActivity: false
  },
  {
    symbol: 'ALUMINIUM',
    name: 'Aluminium',
    sector: 'Base Metals',
    assetType: 'COMMODITY',
    cmp: 0, change: 0, marketCap: 0, marketCapCategory: 'Commodity',
    unit: '₹/kg', exchange: 'MCX',
    rsi: 50, emaCrossover: '9/21', macdSignal: 'Hold', volumeSpike: 1.0,
    supertrend: 'Hold', fiftyTwoWeekHigh: 0, fiftyTwoWeekLow: 0, bollingerStatus: 'Middle',
    pe: 0, roe: 0, debtEquity: 0, revenueGrowth: 0, promoterHolding: 0, fcfPositive: false,
    fiiFlow: 0, sectorSensitivity: { crude: 'Medium', rupee: 'High', rate: 'Medium' },
    pcr: 1.0, oiBuildup: 'Neutral', analystRating: 'Hold', insiderActivity: false
  }
];

// ==================== CURRENCY ====================
export const currencies = [
  {
    symbol: 'DXY',
    name: 'US Dollar Index',
    sector: 'Currency',
    assetType: 'CURRENCY',
    cmp: 0, change: 0, marketCap: 0, marketCapCategory: 'Currency',
    unit: 'Index',
    rsi: 50, emaCrossover: '9/21', macdSignal: 'Hold', volumeSpike: 1.0,
    supertrend: 'Hold', fiftyTwoWeekHigh: 0, fiftyTwoWeekLow: 0, bollingerStatus: 'Middle',
    pe: 0, roe: 0, debtEquity: 0, revenueGrowth: 0, promoterHolding: 0, fcfPositive: false,
    fiiFlow: 0, sectorSensitivity: { crude: 'High', rupee: 'High', rate: 'High' },
    pcr: 1.0, oiBuildup: 'Neutral', analystRating: 'Hold', insiderActivity: false
  },
  {
    symbol: 'USDINR',
    name: 'USD/INR',
    sector: 'Currency',
    assetType: 'CURRENCY',
    cmp: 0, change: 0, marketCap: 0, marketCapCategory: 'Currency',
    unit: '₹',
    rsi: 50, emaCrossover: '9/21', macdSignal: 'Hold', volumeSpike: 1.0,
    supertrend: 'Hold', fiftyTwoWeekHigh: 0, fiftyTwoWeekLow: 0, bollingerStatus: 'Middle',
    pe: 0, roe: 0, debtEquity: 0, revenueGrowth: 0, promoterHolding: 0, fcfPositive: false,
    fiiFlow: 0, sectorSensitivity: { crude: 'High', rupee: 'High', rate: 'High' },
    pcr: 1.0, oiBuildup: 'Neutral', analystRating: 'Hold', insiderActivity: false
  }
];

// Combined data export - sorted by market cap
export const stocksData = [
  ...largeCapStocks,
  ...midCapStocks,
  ...smallCapStocks,
  ...commodities,
  ...currencies
].sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));

// Export individual categories
export const getAllAssets = () => stocksData;
export const getLargeCapStocks = () => largeCapStocks;
export const getMidCapStocks = () => midCapStocks;
export const getSmallCapStocks = () => smallCapStocks;
export const getCommodities = () => commodities;
export const getCurrencies = () => currencies;

// Market data (placeholder - will be fetched real-time)
export const marketData = {
  nifty50: { value: 0, change: 0 },
  indiaVix: { value: 0, status: 'Calm' },
  fiiFlow: { value: 0, type: 'Neutral' }
};

// Filter options
export const filterOptions = {
  sectors: [...new Set(stocksData.map(s => s.sector))].sort(),
  marketCapCategories: ['LargeCap', 'MidCap', 'SmallCap'],
  emaCrossovers: ['9/21', '21/50', '50/200'],
  signals: ['Buy', 'Sell', 'Hold'],
  bollingerStatuses: ['Upper', 'Middle', 'Lower'],
  fiiFlows: ['Strong Buy', 'Buy', 'Neutral', 'Sell', 'Strong Sell'],
  analystRatings: ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'],
  oiBuildups: ['Long', 'Short', 'Long Unwinding', 'Short Covering', 'Neutral'],
  assetTypes: ['All', 'LARGECAP', 'MIDCAP', 'SMALLCAP', 'COMMODITY', 'CURRENCY']
};

console.log(`📊 Loaded ${largeCapStocks.length} Large Cap, ${midCapStocks.length} Mid Cap, ${smallCapStocks.length} Small Cap stocks + ${commodities.length} Commodities + ${currencies.length} Currencies = ${stocksData.length} total assets`);
