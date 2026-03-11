import React, { useState, useMemo } from 'react';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  TrendingUp, 
  TrendingDown,
  Minus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { getScoreColor, getScoreLabel } from '../utils/scoringEngine';

const ResultsTable = ({ stocks, marketData, onStockClick, selectedStock }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'marketCap', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const pageSizeOptions = [10, 20, 30, 50, 100];

  const sortedStocks = useMemo(() => {
    const sorted = [...stocks].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Handle nested values
      if (sortConfig.key === 'overallScore') {
        aVal = a.scores?.total || 0;
        bVal = b.scores?.total || 0;
      }

      if (typeof aVal === 'string') {
        return sortConfig.direction === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return sorted;
  }, [stocks, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedStocks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedStocks = sortedStocks.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [stocks.length]);

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown size={12} className="sort-icon inactive" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp size={12} className="sort-icon active" />
      : <ArrowDown size={12} className="sort-icon active" />;
  };

  const formatCurrency = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L Cr`;
    }
    return `₹${value.toLocaleString('en-IN')} Cr`;
  };

  const formatMarketCap = (value) => {
    if (value >= 100000) {
      return `${(value / 100000).toFixed(2)}L`;
    }
    return `${(value / 1000).toFixed(0)}K`;
  };

  const getChangeClass = (value) => value >= 0 ? 'positive' : 'negative';
  
  const getMacdClass = (signal) => {
    if (signal === 'Buy') return 'buy';
    if (signal === 'Sell') return 'sell';
    return 'neutral';
  };

  const getSupertrendClass = (trend) => trend === 'Buy' ? 'buy' : 'sell';

  const getRatingClass = (rating) => {
    if (rating === 'Strong Buy') return 'strong-buy';
    if (rating === 'Buy') return 'buy';
    if (rating === 'Hold') return 'hold';
    return 'sell';
  };

  const ScoreBar = ({ score, maxScore, label }) => {
    const percentage = (score / maxScore) * 100;
    return (
      <div className="score-bar-container">
        <div 
          className="score-bar" 
          style={{ 
            width: `${percentage}%`,
            backgroundColor: getScoreColor(score * (100 / maxScore))
          }}
        />
        <span className="score-value">{score}</span>
      </div>
    );
  };

  const OverallScoreCell = ({ scores }) => {
    const total = scores?.total || 0;
    const color = getScoreColor(total);
    const label = getScoreLabel(total);

    return (
      <div className="overall-score-cell">
        <div className="score-main" style={{ color }}>
          <span className="score-number">{total}</span>
          <span className="score-label">{label}</span>
        </div>
        <div className="score-breakdown">
          <div className="score-mini" title="Technical">
            <span className="mini-label">T</span>
            <ScoreBar score={scores?.technical || 0} maxScore={25} />
          </div>
          <div className="score-mini" title="Fundamental">
            <span className="mini-label">F</span>
            <ScoreBar score={scores?.fundamental || 0} maxScore={25} />
          </div>
          <div className="score-mini" title="Macro">
            <span className="mini-label">M</span>
            <ScoreBar score={scores?.macro || 0} maxScore={20} />
          </div>
          <div className="score-mini" title="Micro">
            <span className="mini-label">μ</span>
            <ScoreBar score={scores?.micro || 0} maxScore={15} />
          </div>
          <div className="score-mini" title="Sentiment">
            <span className="mini-label">S</span>
            <ScoreBar score={scores?.sentiment || 0} maxScore={15} />
          </div>
        </div>
      </div>
    );
  };

  const getAssetTypeClass = (assetType) => {
    const classes = {
      'LARGECAP': 'asset-largecap',
      'MIDCAP': 'asset-midcap',
      'SMALLCAP': 'asset-smallcap',
      'COMMODITY': 'asset-commodity',
      'CURRENCY': 'asset-currency'
    };
    return classes[assetType] || '';
  };

  const getAssetTypeLabel = (assetType) => {
    const labels = {
      'LARGECAP': 'LC',
      'MIDCAP': 'MC',
      'SMALLCAP': 'SC',
      'COMMODITY': 'COM',
      'CURRENCY': 'CUR'
    };
    return labels[assetType] || '';
  };

  return (
    <div className="results-table-container">
      <div className="results-header">
        <h2>Screener Results</h2>
        <div className="results-meta">
          <span className="results-count">{stocks.length} assets</span>
          <span className="results-range">Showing {startIndex + 1}-{Math.min(endIndex, stocks.length)}</span>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('symbol')} className="sortable sticky-col">
                Symbol <SortIcon columnKey="symbol" />
              </th>
              <th onClick={() => handleSort('assetType')} className="sortable">
                Type <SortIcon columnKey="assetType" />
              </th>
              <th onClick={() => handleSort('cmp')} className="sortable numeric">
                CMP (₹) <SortIcon columnKey="cmp" />
              </th>
              <th onClick={() => handleSort('change')} className="sortable numeric">
                Chg% <SortIcon columnKey="change" />
              </th>
              <th onClick={() => handleSort('marketCap')} className="sortable numeric">
                Mkt Cap <SortIcon columnKey="marketCap" />
              </th>
              <th onClick={() => handleSort('pe')} className="sortable numeric">
                P/E <SortIcon columnKey="pe" />
              </th>
              <th onClick={() => handleSort('roe')} className="sortable numeric">
                ROE% <SortIcon columnKey="roe" />
              </th>
              <th onClick={() => handleSort('rsi')} className="sortable numeric">
                RSI <SortIcon columnKey="rsi" />
              </th>
              <th onClick={() => handleSort('macdSignal')} className="sortable">
                MACD <SortIcon columnKey="macdSignal" />
              </th>
              <th onClick={() => handleSort('supertrend')} className="sortable">
                Supertrend <SortIcon columnKey="supertrend" />
              </th>
              <th onClick={() => handleSort('pcr')} className="sortable numeric">
                PCR <SortIcon columnKey="pcr" />
              </th>
              <th onClick={() => handleSort('fiiFlow')} className="sortable numeric">
                FII Flow <SortIcon columnKey="fiiFlow" />
              </th>
              <th onClick={() => handleSort('analystRating')} className="sortable">
                Analyst <SortIcon columnKey="analystRating" />
              </th>
              <th onClick={() => handleSort('overallScore')} className="sortable score-col">
                Score <SortIcon columnKey="overallScore" />
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedStocks.map((stock) => (
              <tr 
                key={stock.symbol} 
                className={`stock-row ${selectedStock?.symbol === stock.symbol ? 'selected' : ''}`}
                onClick={() => onStockClick && onStockClick(stock)}
              >
                <td className="sticky-col symbol-cell">
                  <div className="symbol-info">
                    <span className="symbol">{stock.symbol}</span>
                    <span className="sector">{stock.sector}</span>
                  </div>
                </td>
                <td>
                  <span className={`asset-type-badge ${getAssetTypeClass(stock.assetType)}`}>
                    {getAssetTypeLabel(stock.assetType)}
                  </span>
                </td>
                <td className="numeric mono">
                  {stock.cmp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className={`numeric mono ${getChangeClass(stock.change)}`}>
                  {stock.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </td>
                <td className="numeric mono">
                  ₹{formatMarketCap(stock.marketCap)} Cr
                </td>
                <td className="numeric mono">{stock.pe.toFixed(1)}</td>
                <td className="numeric mono">{stock.roe.toFixed(1)}%</td>
                <td className="numeric mono">
                  <span className={`rsi-value ${stock.rsi < 30 ? 'oversold' : stock.rsi > 70 ? 'overbought' : ''}`}>
                    {stock.rsi.toFixed(1)}
                  </span>
                </td>
                <td>
                  <span className={`signal-badge ${getMacdClass(stock.macdSignal)}`}>
                    {stock.macdSignal}
                  </span>
                </td>
                <td>
                  <span className={`signal-badge ${getSupertrendClass(stock.supertrend)}`}>
                    {stock.supertrend === 'Buy' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {stock.supertrend}
                  </span>
                </td>
                <td className="numeric mono">{stock.pcr.toFixed(2)}</td>
                <td className={`numeric mono ${stock.fiiFlow >= 0 ? 'positive' : 'negative'}`}>
                  {stock.fiiFlow >= 0 ? '+' : ''}₹{stock.fiiFlow.toLocaleString('en-IN')}
                </td>
                <td>
                  <span className={`rating-badge ${getRatingClass(stock.analystRating)}`}>
                    {stock.analystRating}
                  </span>
                </td>
                <td className="score-col">
                  <OverallScoreCell scores={stock.scores} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <div className="pagination-info">
          <span className="page-size-label">Rows per page:</span>
          <select 
            value={pageSize} 
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="page-size-select"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="pagination-controls">
          <button 
            className="page-btn"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            title="First page"
          >
            <ChevronsLeft size={16} />
          </button>
          <button 
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="page-numbers">
            {getPageNumbers().map(page => (
              <button
                key={page}
                className={`page-number ${page === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button 
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <ChevronRight size={16} />
          </button>
          <button 
            className="page-btn"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>

        <div className="pagination-summary">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
