// Scoring Engine for Stock Screener
// Total: 100 points = Technical(25) + Fundamental(25) + Macro(20) + Micro(15) + Sentiment(15)

export const calculateTechnicalScore = (stock) => {
  if (!stock) return 0;
  let score = 0;
  
  // RSI scoring (0-6 points) - optimal range 40-60
  const rsi = stock.rsi || 50;
  if (rsi >= 40 && rsi <= 60) score += 6;
  else if (rsi >= 30 && rsi <= 70) score += 4;
  else if (rsi < 30) score += 2; // Oversold - potential reversal
  else score += 1; // Overbought
  
  // MACD Signal (0-5 points)
  if (stock.macdSignal === "Buy") score += 5;
  else if (stock.macdSignal === "Neutral") score += 2;
  else score += 0;
  
  // Supertrend (0-5 points)
  if (stock.supertrend === "Buy") score += 5;
  else score += 0;
  
  // Volume Spike (0-4 points)
  if (stock.volumeSpike >= 2.0) score += 4;
  else if (stock.volumeSpike >= 1.5) score += 3;
  else if (stock.volumeSpike >= 1.2) score += 2;
  else score += 1;
  
  // 52W High/Low % (0-3 points)
  const fiftyTwoWeekRange = ((stock.cmp - stock.fiftyTwoWeekLow) / (stock.fiftyTwoWeekHigh - stock.fiftyTwoWeekLow)) * 100;
  if (fiftyTwoWeekRange >= 70 && fiftyTwoWeekRange <= 90) score += 3; // Near highs but not at peak
  else if (fiftyTwoWeekRange >= 50) score += 2;
  else score += 1;
  
  // Bollinger Band (0-2 points)
  if (stock.bollingerStatus === "Middle") score += 2;
  else if (stock.bollingerStatus === "Upper") score += 1;
  else score += 0;
  
  return Math.min(score, 25);
};

export const calculateFundamentalScore = (stock) => {
  if (!stock) return 0;
  let score = 0;
  
  // P/E Ratio (0-5 points) - lower is better for value
  const pe = stock.pe || 25;
  if (pe <= 15) score += 5;
  else if (pe <= 25) score += 4;
  else if (pe <= 35) score += 3;
  else if (pe <= 50) score += 2;
  else score += 1;
  
  // ROE (0-5 points) - higher is better
  if (stock.roe >= 25) score += 5;
  else if (stock.roe >= 18) score += 4;
  else if (stock.roe >= 12) score += 3;
  else if (stock.roe >= 8) score += 2;
  else score += 1;
  
  // Debt/Equity (0-5 points) - lower is better
  if (stock.debtEquity <= 0.3) score += 5;
  else if (stock.debtEquity <= 0.7) score += 4;
  else if (stock.debtEquity <= 1.2) score += 3;
  else if (stock.debtEquity <= 2.0) score += 2;
  else score += 1;
  
  // Revenue Growth (0-5 points)
  if (stock.revenueGrowth >= 25) score += 5;
  else if (stock.revenueGrowth >= 18) score += 4;
  else if (stock.revenueGrowth >= 12) score += 3;
  else if (stock.revenueGrowth >= 6) score += 2;
  else score += 1;
  
  // Promoter Holding (0-3 points)
  if (stock.promoterHolding >= 60) score += 3;
  else if (stock.promoterHolding >= 45) score += 2;
  else score += 1;
  
  // FCF Positive (0-2 points)
  if (stock.fcfPositive) score += 2;
  
  return Math.min(score, 25);
};

export const calculateMacroScore = (stock, marketData) => {
  if (!stock) return 0;
  let score = 0;
  
  // FII Flow for stock (0-6 points)
  const fiiFlow = stock.fiiFlow || 0;
  if (fiiFlow > 2000) score += 6;
  else if (fiiFlow > 1000) score += 5;
  else if (fiiFlow > 0) score += 3;
  else if (fiiFlow > -500) score += 2;
  else score += 0;
  
  // India VIX sensitivity (0-5 points)
  const vixValue = marketData?.indiaVix?.value || 15;
  if (vixValue < 15) score += 5; // Calm market
  else if (vixValue < 20) score += 3;
  else score += 1; // Fear market
  
  // Sector Sensitivity to external factors (0-6 points)
  const sensitivities = stock.sectorSensitivity || { crude: 'Medium', rupee: 'Medium', rate: 'Medium' };
  let sensitivityScore = 0;
  if (sensitivities.crude === "Low") sensitivityScore += 2;
  else if (sensitivities.crude === "Medium") sensitivityScore += 1;
  if (sensitivities.rupee === "Low") sensitivityScore += 2;
  else if (sensitivities.rupee === "Medium") sensitivityScore += 1;
  if (sensitivities.rate === "Low") sensitivityScore += 2;
  else if (sensitivities.rate === "Medium") sensitivityScore += 1;
  score += Math.min(sensitivityScore, 6);
  
  // GDP Growth Quartile (0-3 points) - simulated based on sector
  const cyclicalSectors = ["Auto", "Infrastructure", "Banking", "NBFC"];
  if (cyclicalSectors.includes(stock.sector)) score += 3;
  else score += 2;
  
  return Math.min(score, 20);
};

export const calculateMicroScore = (stock) => {
  if (!stock) return 0;
  let score = 0;
  
  // Market Cap Category (0-5 points)
  const marketCapCategory = stock.marketCapCategory || 'MidCap';
  if (marketCapCategory === "LargeCap") score += 5;
  else if (marketCapCategory === "MidCap") score += 4;
  else score += 3;
  
  // Sector strength (0-5 points) - based on momentum
  const change = stock.change || 0;
  if (change > 2) score += 5;
  else if (change > 1) score += 4;
  else if (change > 0) score += 3;
  else if (change > -1) score += 2;
  else score += 1;
  
  // Company specific factors (0-5 points) - based on promoter + FCF
  let companyScore = 0;
  const promoterHolding = stock.promoterHolding || 0;
  const debtEquity = stock.debtEquity || 1;
  if (promoterHolding >= 50) companyScore += 2;
  else if (promoterHolding >= 30) companyScore += 1;
  if (stock.fcfPositive) companyScore += 2;
  if (debtEquity < 0.5) companyScore += 1;
  score += Math.min(companyScore, 5);
  
  return Math.min(score, 15);
};

export const calculateSentimentScore = (stock) => {
  if (!stock) return 0;
  let score = 0;
  
  // PCR Range (0-5 points) - 0.8-1.2 optimal
  const pcr = stock.pcr || 1.0;
  if (pcr >= 0.9 && pcr <= 1.3) score += 5;
  else if (pcr >= 0.7 && pcr <= 1.5) score += 3;
  else if (pcr < 0.7) score += 1; // Too bearish
  else score += 2; // Too bullish
  
  // OI Buildup (0-4 points)
  const oiBuildup = stock.oiBuildup || 'Neutral';
  if (oiBuildup === "Long") score += 4;
  else if (oiBuildup === "Unwinding") score += 2;
  else score += 0; // Short buildup
  
  // Analyst Rating (0-4 points)
  const analystRating = stock.analystRating || 'Hold';
  if (analystRating === "Strong Buy") score += 4;
  else if (analystRating === "Buy") score += 3;
  else if (analystRating === "Hold") score += 2;
  else score += 0;
  
  // Insider Activity (0-2 points)
  if (stock.insiderActivity) score += 2;
  
  return Math.min(score, 15);
};

export const calculateOverallScore = (stock, marketData) => {
  if (!stock) {
    return { technical: 0, fundamental: 0, macro: 0, micro: 0, sentiment: 0, total: 0 };
  }
  const technical = calculateTechnicalScore(stock);
  const fundamental = calculateFundamentalScore(stock);
  const macro = calculateMacroScore(stock, marketData);
  const micro = calculateMicroScore(stock);
  const sentiment = calculateSentimentScore(stock);
  
  return {
    technical,
    fundamental,
    macro,
    micro,
    sentiment,
    total: technical + fundamental + macro + micro + sentiment
  };
};

export const getScoreColor = (score) => {
  if (score >= 70) return '#00C853'; // Green - Strong Buy
  if (score >= 50) return '#FFD600'; // Yellow - Neutral
  return '#FF5252'; // Red - Avoid
};

export const getScoreLabel = (score) => {
  if (score >= 70) return 'Strong Buy';
  if (score >= 50) return 'Neutral';
  return 'Avoid';
};
