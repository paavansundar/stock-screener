import React, { useMemo } from 'react';
import { 
  X, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Activity,
  Building2,
  Globe,
  Microscope,
  MessageSquare,
  BarChart3,
  Target
} from 'lucide-react';
import { getScoreColor, getScoreLabel } from '../utils/scoringEngine';

const StockDetailPanel = ({ stock, onClose }) => {
  if (!stock) return null;

  const scores = stock.scores || { technical: 0, fundamental: 0, macro: 0, micro: 0, sentiment: 0, total: 0 };
  
  // Generate mini chart data (simulated price history)
  const chartData = useMemo(() => {
    const data = [];
    let price = stock.cmp * 0.95;
    for (let i = 0; i < 30; i++) {
      price = price * (1 + (Math.random() - 0.48) * 0.03);
      data.push(price);
    }
    // Ensure last point matches current price
    data.push(stock.cmp);
    return data;
  }, [stock.cmp]);

  // Calculate chart bounds
  const minPrice = Math.min(...chartData);
  const maxPrice = Math.max(...chartData);
  const priceRange = maxPrice - minPrice || 1;

  // Generate SVG path for price line
  const generatePath = () => {
    const width = 280;
    const height = 100;
    const points = chartData.map((price, i) => {
      const x = (i / (chartData.length - 1)) * width;
      const y = height - ((price - minPrice) / priceRange) * height;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  // Generate area path (for gradient fill)
  const generateAreaPath = () => {
    const width = 280;
    const height = 100;
    const points = chartData.map((price, i) => {
      const x = (i / (chartData.length - 1)) * width;
      const y = height - ((price - minPrice) / priceRange) * height;
      return `${x},${y}`;
    });
    return `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;
  };

  // Radar chart calculations
  const radarSize = 120;
  const radarCenter = radarSize / 2;
  const radarRadius = radarSize / 2 - 15;
  
  const dimensions = [
    { name: 'Technical', value: scores.technical, max: 25, color: '#00BCD4' },
    { name: 'Fundamental', value: scores.fundamental, max: 25, color: '#4CAF50' },
    { name: 'Macro', value: scores.macro, max: 20, color: '#FF9800' },
    { name: 'Micro', value: scores.micro, max: 15, color: '#9C27B0' },
    { name: 'Sentiment', value: scores.sentiment, max: 15, color: '#E91E63' }
  ];

  const getRadarPoint = (index, value, max) => {
    const angle = (index * 72 - 90) * (Math.PI / 180);
    const radius = (value / max) * radarRadius;
    return {
      x: radarCenter + radius * Math.cos(angle),
      y: radarCenter + radius * Math.sin(angle)
    };
  };

  const radarPoints = dimensions.map((d, i) => getRadarPoint(i, d.value, d.max));
  const radarPath = radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';

  // Background pentagon
  const bgPoints = dimensions.map((_, i) => getRadarPoint(i, 1, 1));
  const bgPath = bgPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';

  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? '#00C853' : '#FF5252';

  return (
    <div className="stock-detail-panel">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-title">
          <h2>{stock.symbol}</h2>
          <span className="detail-name">{stock.name}</span>
        </div>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Price Section */}
      <div className="detail-price-section">
        <div className="current-price">
          <span className="price-value">₹{stock.cmp?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {isPositive ? '+' : ''}{stock.change?.toFixed(2)}%
          </span>
        </div>
        <div className="price-meta">
          <span>{stock.sector}</span>
          <span className="separator">•</span>
          <span>{stock.assetType}</span>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="mini-chart">
        <div className="chart-header">
          <span>30-Day Price Movement</span>
          <span className="chart-range">
            ₹{minPrice.toFixed(0)} - ₹{maxPrice.toFixed(0)}
          </span>
        </div>
        <svg width="280" height="100" className="price-chart">
          <defs>
            <linearGradient id={`gradient-${stock.symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={changeColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={changeColor} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path
            d={generateAreaPath()}
            fill={`url(#gradient-${stock.symbol})`}
          />
          <path
            d={generatePath()}
            fill="none"
            stroke={changeColor}
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Overall Score */}
      <div className="overall-score-section">
        <div className="score-header">
          <Target size={18} />
          <span>Overall Score</span>
        </div>
        <div className="score-display">
          <div 
            className="score-circle"
            style={{ 
              background: `conic-gradient(${getScoreColor(scores.total)} ${scores.total * 3.6}deg, #1E2837 0deg)` 
            }}
          >
            <div className="score-inner">
              <span className="score-number">{scores.total}</span>
              <span className="score-label">{getScoreLabel(scores.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="radar-section">
        <div className="radar-header">
          <BarChart3 size={18} />
          <span>5-Dimension Analysis</span>
        </div>
        <div className="radar-container">
          <svg width={radarSize} height={radarSize} className="radar-chart">
            {/* Background circles */}
            {[0.25, 0.5, 0.75, 1].map((scale, i) => (
              <circle
                key={i}
                cx={radarCenter}
                cy={radarCenter}
                r={radarRadius * scale}
                fill="none"
                stroke="#2D3748"
                strokeWidth="1"
                opacity="0.5"
              />
            ))}
            
            {/* Axis lines */}
            {dimensions.map((_, i) => {
              const point = getRadarPoint(i, 1, 1);
              return (
                <line
                  key={i}
                  x1={radarCenter}
                  y1={radarCenter}
                  x2={point.x}
                  y2={point.y}
                  stroke="#2D3748"
                  strokeWidth="1"
                  opacity="0.5"
                />
              );
            })}
            
            {/* Data polygon */}
            <path
              d={radarPath}
              fill="rgba(240, 180, 41, 0.2)"
              stroke="#F0B429"
              strokeWidth="2"
            />
            
            {/* Data points */}
            {radarPoints.map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="4"
                fill={dimensions[i].color}
                stroke="#0A0E17"
                strokeWidth="2"
              />
            ))}
          </svg>
          
          {/* Dimension Labels */}
          <div className="radar-labels">
            {dimensions.map((dim, i) => (
              <div 
                key={i} 
                className="radar-label"
                style={{ 
                  '--label-color': dim.color,
                  '--angle': `${i * 72 - 90}deg`
                }}
              >
                <span className="label-name">{dim.name}</span>
                <span className="label-value" style={{ color: dim.color }}>
                  {dim.value}/{dim.max}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="score-breakdown">
        <div className="breakdown-item">
          <div className="breakdown-header">
            <Activity size={14} style={{ color: '#00BCD4' }} />
            <span>Technical</span>
          </div>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill" 
              style={{ width: `${(scores.technical / 25) * 100}%`, background: '#00BCD4' }}
            />
          </div>
          <span className="breakdown-value">{scores.technical}/25</span>
        </div>

        <div className="breakdown-item">
          <div className="breakdown-header">
            <Building2 size={14} style={{ color: '#4CAF50' }} />
            <span>Fundamental</span>
          </div>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill" 
              style={{ width: `${(scores.fundamental / 25) * 100}%`, background: '#4CAF50' }}
            />
          </div>
          <span className="breakdown-value">{scores.fundamental}/25</span>
        </div>

        <div className="breakdown-item">
          <div className="breakdown-header">
            <Globe size={14} style={{ color: '#FF9800' }} />
            <span>Macro</span>
          </div>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill" 
              style={{ width: `${(scores.macro / 20) * 100}%`, background: '#FF9800' }}
            />
          </div>
          <span className="breakdown-value">{scores.macro}/20</span>
        </div>

        <div className="breakdown-item">
          <div className="breakdown-header">
            <Microscope size={14} style={{ color: '#9C27B0' }} />
            <span>Micro</span>
          </div>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill" 
              style={{ width: `${(scores.micro / 15) * 100}%`, background: '#9C27B0' }}
            />
          </div>
          <span className="breakdown-value">{scores.micro}/15</span>
        </div>

        <div className="breakdown-item">
          <div className="breakdown-header">
            <MessageSquare size={14} style={{ color: '#E91E63' }} />
            <span>Sentiment</span>
          </div>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill" 
              style={{ width: `${(scores.sentiment / 15) * 100}%`, background: '#E91E63' }}
            />
          </div>
          <span className="breakdown-value">{scores.sentiment}/15</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="key-metrics">
        <h4>Key Metrics</h4>
        <div className="metrics-grid">
          <div className="metric">
            <span className="metric-label">P/E Ratio</span>
            <span className="metric-value">{stock.pe?.toFixed(1)}</span>
          </div>
          <div className="metric">
            <span className="metric-label">ROE</span>
            <span className="metric-value">{stock.roe?.toFixed(1)}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">D/E Ratio</span>
            <span className="metric-value">{stock.debtEquity?.toFixed(2)}</span>
          </div>
          <div className="metric">
            <span className="metric-label">RSI</span>
            <span className="metric-value">{stock.rsi?.toFixed(1)}</span>
          </div>
          <div className="metric">
            <span className="metric-label">52W High</span>
            <span className="metric-value">₹{stock.fiftyTwoWeekHigh?.toFixed(0)}</span>
          </div>
          <div className="metric">
            <span className="metric-label">52W Low</span>
            <span className="metric-value">₹{stock.fiftyTwoWeekLow?.toFixed(0)}</span>
          </div>
          <div className="metric">
            <span className="metric-label">Vol Spike</span>
            <span className="metric-value">{stock.volumeSpike?.toFixed(2)}x</span>
          </div>
          <div className="metric">
            <span className="metric-label">PCR</span>
            <span className="metric-value">{stock.pcr?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Signals */}
      <div className="signals-section">
        <h4>Trading Signals</h4>
        <div className="signals-grid">
          <div className={`signal ${stock.supertrend?.toLowerCase()}`}>
            <span className="signal-label">Supertrend</span>
            <span className="signal-value">{stock.supertrend}</span>
          </div>
          <div className={`signal ${stock.macdSignal?.toLowerCase()}`}>
            <span className="signal-label">MACD</span>
            <span className="signal-value">{stock.macdSignal}</span>
          </div>
          <div className="signal">
            <span className="signal-label">EMA</span>
            <span className="signal-value">{stock.emaCrossover}</span>
          </div>
          <div className="signal">
            <span className="signal-label">OI Buildup</span>
            <span className="signal-value">{stock.oiBuildup}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetailPanel;
