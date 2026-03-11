import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign, Clock, RefreshCw, Wifi, WifiOff } from 'lucide-react';

const TopBar = ({ marketData, isLoading, lastUpdated, onRefresh, stockCount }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Check if Indian market is currently open
  const isMarketOpen = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffset);
    
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const day = istTime.getDay();
    
    if (day === 0 || day === 6) return false;
    
    const timeInMinutes = hours * 60 + minutes;
    return timeInMinutes >= 9 * 60 + 15 && timeInMinutes <= 15 * 60 + 30;
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short',
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const isPositive = (value) => value >= 0;
  const vixValue = marketData?.indiaVix?.value || 0;
  const vixStatus = vixValue < 15 ? 'Calm' : vixValue < 20 ? 'Normal' : 'Fear';
  const vixColor = vixStatus === 'Calm' ? '#00C853' : vixStatus === 'Normal' ? '#FFD600' : '#FF5252';

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo">
          <Activity className="logo-icon" />
          <span className="logo-text">NSE<span className="logo-accent">/</span>BSE</span>
          <span className="logo-subtitle">SCREENER PRO</span>
        </div>
      </div>

      <div className="topbar-center">
        <div className="market-ticker">
          {/* NIFTY 50 */}
          <div className="ticker-item">
            <span className="ticker-label">NIFTY 50</span>
            <span className="ticker-value">
              {marketData?.nifty50?.value?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '—'}
            </span>
            {marketData?.nifty50?.change !== undefined && (
              <span className={`ticker-change ${isPositive(marketData.nifty50.change) ? 'positive' : 'negative'}`}>
                {isPositive(marketData.nifty50.change) ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {isPositive(marketData.nifty50.change) ? '+' : ''}{marketData.nifty50.change}%
                <span className="ticker-points">
                  ({isPositive(marketData.nifty50.points) ? '+' : ''}{(marketData.nifty50.points || 0).toFixed(2)})
                </span>
              </span>
            )}
          </div>

          <div className="ticker-divider" />

          {/* India VIX */}
          <div className="ticker-item">
            <span className="ticker-label">INDIA VIX</span>
            <span className="ticker-value">{vixValue.toFixed(2)}</span>
            <span className="ticker-status" style={{ color: vixColor }}>
              <span className="status-dot" style={{ backgroundColor: vixColor }} />
              {vixStatus}
            </span>
          </div>

          <div className="ticker-divider" />

          {/* FII Flow */}
          <div className="ticker-item">
            <span className="ticker-label">FII FLOW</span>
            <span className={`ticker-value ${isPositive(marketData?.fiiFlow?.value) ? 'positive' : 'negative'}`}>
              <DollarSign size={14} />
              {isPositive(marketData?.fiiFlow?.value) ? '+' : ''}₹{Math.abs(marketData?.fiiFlow?.value || 0).toLocaleString('en-IN')} Cr
            </span>
            <span className={`ticker-flow ${isPositive(marketData?.fiiFlow?.value) ? 'positive' : 'negative'}`}>
              {isPositive(marketData?.fiiFlow?.value) ? 'NET BUYING' : 'NET SELLING'}
            </span>
          </div>
        </div>
      </div>

      <div className="topbar-right">
        {/* Stock Count */}
        <div className="stock-count">
          <span className="count-value">{stockCount || 0}</span>
          <span className="count-label">Assets</span>
        </div>

        {/* Refresh Button */}
        <button 
          className={`refresh-btn ${isLoading ? 'loading' : ''}`}
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh data"
        >
          <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
        </button>

        {/* Live Status */}
        <div className="mode-indicator">
          <span className="mode-live">
            {isLoading ? (
              <>
                <RefreshCw size={12} className="spinning" />
                LOADING...
              </>
            ) : (
              <>
                <Wifi size={12} className="live-icon" />
                LIVE DATA
              </>
            )}
            {lastUpdated && !isLoading && (
              <span className="last-updated">
                {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
          </span>
        </div>

        {/* Market Status */}
        <div className="market-status">
          {isMarketOpen() ? (
            <div className="status-live">
              <span className="live-dot" />
              MARKET OPEN
            </div>
          ) : (
            <div className="status-closed">
              <WifiOff size={12} />
              MARKET CLOSED
            </div>
          )}
        </div>

        {/* Date/Time */}
        <div className="datetime">
          <Clock size={14} />
          <span className="time">{formatTime(currentTime)}</span>
          <span className="date">{formatDate(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
