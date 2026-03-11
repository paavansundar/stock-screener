import React, { useState, useMemo, useEffect, useCallback } from 'react';
import TopBar from './components/TopBar';
import FilterSidebar from './components/FilterSidebar';
import ResultsTable from './components/ResultsTable';
import StockDetailPanel from './components/StockDetailPanel';
import { fetchRealtimeStockData, fetchRealtimeMarketData, resetMarketState } from './services/realtimeDataService';
import { calculateOverallScore } from './utils/scoringEngine';

function App() {
  // Always real-time - no simulation
  const [stockData, setStockData] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  // Fetch real-time data from exchanges
  const fetchData = useCallback(async (showLoading = false) => {
    console.log('🚀 fetchData called, showLoading:', showLoading);
    try {
      if (showLoading) setIsLoading(true);
      setError(null);
      
      console.log('🔄 Fetching live data from exchanges...');
      
      let stocks, market;
      try {
        [stocks, market] = await Promise.all([
          fetchRealtimeStockData(),
          fetchRealtimeMarketData()
        ]);
      } catch (fetchErr) {
        console.error('❌ Fetch error:', fetchErr);
        throw fetchErr;
      }
      
      console.log('📦 Received stocks:', stocks?.length, 'market:', !!market);
      
      if (stocks && stocks.length > 0) {
        setStockData(stocks);
        console.log(`✅ Loaded ${stocks.length} assets`);
      } else {
        console.warn('⚠️ No stocks returned');
      }
      
      if (market) {
        setMarketData(market);
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('❌ Error fetching data:', err);
      setError('Failed to fetch live data. Please check your connection.');
    } finally {
      console.log('🏁 Setting isLoading to false');
      setIsLoading(false);
    }
  }, []);

  // Initial load and auto-refresh
  useEffect(() => {
    // Initial fetch
    resetMarketState();
    fetchData(true);
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchData(false);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [fetchData]);

  // Manual refresh
  const handleRefresh = useCallback(() => {
    resetMarketState();
    fetchData(true);
  }, [fetchData]);
  // Initial filter state
  const [filters, setFilters] = useState({
    // Asset Type
    assetType: 'All',
    // Technical
    rsiRange: [0, 100],
    emaCrossover: 'All',
    macdSignal: 'All',
    volumeSpike: 0.5,
    supertrend: 'All',
    fiftyTwoWeekRange: [0, 100],
    bollingerStatus: 'All',
    // Fundamental
    peRange: [0, 100],
    roeMin: 0,
    debtEquityMax: 5,
    revenueGrowthMin: 0,
    promoterHoldingMin: 0,
    fcfPositive: false,
    marketCapCategory: ['All'],
    // Macro
    fiiNetFlow: 'All',
    vixRange: 'All',
    sectorSensitivity: {
      crude: 'All',
      rupee: 'All',
      rate: 'All'
    },
    gdpQuartile: 'All',
    // Sentiment
    pcrRange: [0.5, 1.5],
    oiBuildup: 'All',
    analystConsensus: ['All'],
    insiderActivity: false
  });

  // Calculate scores and apply filters
  const processedStocks = useMemo(() => {
    if (!stockData || stockData.length === 0) return [];
    
    // First, calculate scores for all stocks
    const stocksWithScores = stockData.map(stock => ({
      ...stock,
      scores: calculateOverallScore(stock, marketData)
    }));

    // Apply filters
    return stocksWithScores.filter(stock => {
      // Asset Type filter
      if (filters.assetType !== 'All') {
        const typeMap = {
          'Large Cap': 'LARGECAP',
          'Mid Cap': 'MIDCAP',
          'Small Cap': 'SMALLCAP',
          'Commodity': 'COMMODITY',
          'Currency': 'CURRENCY'
        };
        if (stock.assetType !== typeMap[filters.assetType]) return false;
      }

      // Technical filters
      if (stock.rsi < filters.rsiRange[0] || stock.rsi > filters.rsiRange[1]) return false;
      if (filters.emaCrossover !== 'All' && stock.emaCrossover !== filters.emaCrossover) return false;
      if (filters.macdSignal !== 'All' && stock.macdSignal !== filters.macdSignal) return false;
      if (stock.volumeSpike < filters.volumeSpike) return false;
      if (filters.supertrend !== 'All' && stock.supertrend !== filters.supertrend) return false;
      if (filters.bollingerStatus !== 'All' && stock.bollingerStatus !== filters.bollingerStatus) return false;
      
      // Calculate 52-week range percentage
      const range = stock.fiftyTwoWeekHigh - stock.fiftyTwoWeekLow;
      const fiftyTwoWeekPct = range > 0 ? ((stock.cmp - stock.fiftyTwoWeekLow) / range) * 100 : 50;
      if (fiftyTwoWeekPct < filters.fiftyTwoWeekRange[0] || fiftyTwoWeekPct > filters.fiftyTwoWeekRange[1]) return false;

      // Fundamental filters
      if (stock.pe < filters.peRange[0] || stock.pe > filters.peRange[1]) return false;
      if (stock.roe < filters.roeMin) return false;
      if (stock.debtEquity > filters.debtEquityMax) return false;
      if (stock.revenueGrowth < filters.revenueGrowthMin) return false;
      if (stock.promoterHolding < filters.promoterHoldingMin) return false;
      if (filters.fcfPositive && !stock.fcfPositive) return false;
      if (!filters.marketCapCategory.includes('All') && !filters.marketCapCategory.includes(stock.marketCapCategory)) return false;

      // Macro filters
      if (filters.fiiNetFlow === 'Positive' && stock.fiiFlow < 0) return false;
      if (filters.fiiNetFlow === 'Negative' && stock.fiiFlow >= 0) return false;
      
      // Sector sensitivity filters
      if (filters.sectorSensitivity.crude !== 'All' && stock.sectorSensitivity?.crude !== filters.sectorSensitivity.crude) return false;
      if (filters.sectorSensitivity.rupee !== 'All' && stock.sectorSensitivity?.rupee !== filters.sectorSensitivity.rupee) return false;
      if (filters.sectorSensitivity.rate !== 'All' && stock.sectorSensitivity?.rate !== filters.sectorSensitivity.rate) return false;

      // Sentiment filters
      if (stock.pcr < filters.pcrRange[0] || stock.pcr > filters.pcrRange[1]) return false;
      if (filters.oiBuildup !== 'All' && stock.oiBuildup !== filters.oiBuildup) return false;
      if (!filters.analystConsensus.includes('All') && !filters.analystConsensus.includes(stock.analystRating)) return false;
      if (filters.insiderActivity && !stock.insiderActivity) return false;

      return true;
    });
  }, [filters, stockData, marketData]);

  return (
    <div className="app-container">
      <TopBar 
        marketData={marketData} 
        isLoading={isLoading}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        stockCount={stockData.length}
      />
      <div className="main-content">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <div className={`content-area ${selectedStock ? 'with-panel' : ''}`}>
          {isLoading ? (
            <div className="loading-overlay">
              <div className="loading-spinner" />
              <span>Fetching live data from NSE/BSE/MCX...</span>
            </div>
          ) : error ? (
            <div className="error-message">
              <span>{error}</span>
              <button onClick={handleRefresh}>Retry</button>
            </div>
          ) : (
            <ResultsTable 
              stocks={processedStocks} 
              marketData={marketData} 
              onStockClick={setSelectedStock}
              selectedStock={selectedStock}
            />
          )}
        </div>
        {selectedStock && (
          <StockDetailPanel 
            stock={selectedStock} 
            onClose={() => setSelectedStock(null)} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
