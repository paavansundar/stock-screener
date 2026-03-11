import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  BarChart3, 
  Building2, 
  Globe, 
  Microscope, 
  MessageSquare,
  RotateCcw,
  Zap,
  TrendingUp,
  BarChart2,
  Users
} from 'lucide-react';
import { filterOptions } from '../data/stockData';

// Preset filter configurations
const presets = {
  momentum: {
    name: 'Momentum Picks',
    icon: Zap,
    color: '#FF6B35',
    description: 'High momentum stocks with strong technicals',
    filters: {
      assetType: 'Large Cap',
      rsiRange: [55, 80],
      emaCrossover: 'Bullish',
      macdSignal: 'Bullish',
      volumeSpike: 1.5,
      supertrend: 'Bullish',
      fiftyTwoWeekRange: [60, 100],
      bollingerStatus: 'All',
      peRange: [0, 100],
      roeMin: 12,
      debtEquityMax: 2,
      revenueGrowthMin: 10,
      promoterHoldingMin: 40,
      fcfPositive: false,
      marketCapCategory: ['All'],
      fiiNetFlow: 'All',
      vixRange: 'All',
      sectorSensitivity: { crude: 'All', rupee: 'All', rate: 'All' },
      gdpQuartile: 'All',
      pcrRange: [0.5, 1.5],
      oiBuildup: 'Long',
      analystConsensus: ['All'],
      insiderActivity: false
    }
  },
  value: {
    name: 'Value Buys',
    icon: TrendingUp,
    color: '#4CAF50',
    description: 'Undervalued stocks with strong fundamentals',
    filters: {
      assetType: 'All',
      rsiRange: [20, 50],
      emaCrossover: 'All',
      macdSignal: 'All',
      volumeSpike: 0.5,
      supertrend: 'All',
      fiftyTwoWeekRange: [10, 50],
      bollingerStatus: 'All',
      peRange: [0, 20],
      roeMin: 15,
      debtEquityMax: 1,
      revenueGrowthMin: 8,
      promoterHoldingMin: 50,
      fcfPositive: true,
      marketCapCategory: ['All'],
      fiiNetFlow: 'All',
      vixRange: 'All',
      sectorSensitivity: { crude: 'All', rupee: 'All', rate: 'All' },
      gdpQuartile: 'All',
      pcrRange: [0.5, 1.5],
      oiBuildup: 'All',
      analystConsensus: ['Buy', 'Strong Buy'],
      insiderActivity: true
    }
  },
  fno: {
    name: 'F&O Favorites',
    icon: BarChart2,
    color: '#9C27B0',
    description: 'High liquidity F&O stocks with active OI',
    filters: {
      assetType: 'Large Cap',
      rsiRange: [30, 70],
      emaCrossover: 'All',
      macdSignal: 'All',
      volumeSpike: 1.2,
      supertrend: 'All',
      fiftyTwoWeekRange: [0, 100],
      bollingerStatus: 'All',
      peRange: [0, 100],
      roeMin: 10,
      debtEquityMax: 3,
      revenueGrowthMin: 0,
      promoterHoldingMin: 30,
      fcfPositive: false,
      marketCapCategory: ['Large', 'Mid'],
      fiiNetFlow: 'All',
      vixRange: 'Low',
      sectorSensitivity: { crude: 'All', rupee: 'All', rate: 'All' },
      gdpQuartile: 'All',
      pcrRange: [0.7, 1.3],
      oiBuildup: 'All',
      analystConsensus: ['All'],
      insiderActivity: false
    }
  },
  fii: {
    name: 'FII Darlings',
    icon: Users,
    color: '#2196F3',
    description: 'Stocks with strong FII interest & flows',
    filters: {
      assetType: 'Large Cap',
      rsiRange: [0, 100],
      emaCrossover: 'All',
      macdSignal: 'All',
      volumeSpike: 0.5,
      supertrend: 'All',
      fiftyTwoWeekRange: [0, 100],
      bollingerStatus: 'All',
      peRange: [0, 50],
      roeMin: 12,
      debtEquityMax: 2,
      revenueGrowthMin: 10,
      promoterHoldingMin: 35,
      fcfPositive: false,
      marketCapCategory: ['Large'],
      fiiNetFlow: 'Net Buyer',
      vixRange: 'All',
      sectorSensitivity: { crude: 'All', rupee: 'All', rate: 'All' },
      gdpQuartile: 'All',
      pcrRange: [0.5, 1.5],
      oiBuildup: 'All',
      analystConsensus: ['Buy', 'Strong Buy'],
      insiderActivity: false
    }
  }
};

const FilterPanel = ({ title, icon: Icon, children, isOpen, onToggle, color }) => {
  return (
    <div className="filter-panel">
      <div 
        className="filter-panel-header" 
        onClick={onToggle}
        style={{ borderLeftColor: color }}
      >
        <div className="filter-panel-title">
          <Icon size={16} style={{ color }} />
          <span>{title}</span>
        </div>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>
      <div className={`filter-panel-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

const RangeSlider = ({ label, min, max, value, onChange, step = 1, unit = '' }) => {
  return (
    <div className="filter-control">
      <div className="filter-label">
        <span>{label}</span>
        <span className="filter-value">{value[0]}{unit} - {value[1]}{unit}</span>
      </div>
      <div className="dual-range-container">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          step={step}
          onChange={(e) => onChange([parseFloat(e.target.value), value[1]])}
          className="range-slider"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          step={step}
          onChange={(e) => onChange([value[0], parseFloat(e.target.value)])}
          className="range-slider"
        />
      </div>
    </div>
  );
};

const SingleSlider = ({ label, min, max, value, onChange, step = 1, unit = '' }) => {
  return (
    <div className="filter-control">
      <div className="filter-label">
        <span>{label}</span>
        <span className="filter-value">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="range-slider single"
      />
    </div>
  );
};

const SelectFilter = ({ label, options, value, onChange }) => {
  return (
    <div className="filter-control">
      <label className="filter-label">{label}</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="filter-select"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

const ToggleFilter = ({ label, value, onChange }) => {
  return (
    <div className="filter-control toggle">
      <label className="filter-label">{label}</label>
      <button 
        className={`toggle-btn ${value ? 'active' : ''}`}
        onClick={() => onChange(!value)}
      >
        <span className="toggle-slider" />
        <span className="toggle-text">{value ? 'ON' : 'OFF'}</span>
      </button>
    </div>
  );
};

const MultiSelectFilter = ({ label, options, value, onChange }) => {
  const toggleOption = (opt) => {
    if (opt === 'All') {
      onChange(['All']);
    } else {
      const newValue = value.includes(opt)
        ? value.filter(v => v !== opt)
        : [...value.filter(v => v !== 'All'), opt];
      onChange(newValue.length ? newValue : ['All']);
    }
  };

  return (
    <div className="filter-control">
      <label className="filter-label">{label}</label>
      <div className="multi-select">
        {options.map(opt => (
          <button
            key={opt}
            className={`multi-select-btn ${value.includes(opt) ? 'active' : ''}`}
            onClick={() => toggleOption(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

const FilterSidebar = ({ filters, setFilters }) => {
  const [openPanels, setOpenPanels] = useState({
    technical: true,
    fundamental: false,
    macro: false,
    micro: false,
    sentiment: false
  });

  const [activePreset, setActivePreset] = useState(null);

  const togglePanel = (panel) => {
    setOpenPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
  };

  const applyPreset = (presetKey) => {
    const preset = presets[presetKey];
    if (preset) {
      setFilters(preset.filters);
      setActivePreset(presetKey);
    }
  };

  const resetFilters = () => {
    setActivePreset(null);
    setFilters({
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
  };

  return (
    <div className="filter-sidebar">
      <div className="sidebar-header">
        <h2>Filters</h2>
        <button className="reset-btn" onClick={resetFilters}>
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Preset Strategy Buttons */}
      <div className="preset-section">
        <label className="preset-label">Quick Strategies</label>
        <div className="preset-buttons">
          {Object.entries(presets).map(([key, preset]) => {
            const Icon = preset.icon;
            return (
              <button
                key={key}
                className={`preset-btn ${activePreset === key ? 'active' : ''}`}
                onClick={() => applyPreset(key)}
                style={{ '--preset-color': preset.color }}
                title={preset.description}
              >
                <Icon size={14} />
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asset Type Filter - Always visible at top */}
      <div className="asset-type-filter">
        <label className="filter-label">Asset Type</label>
        <div className="asset-type-buttons">
          {filterOptions.assetTypes.map(type => (
            <button
              key={type}
              className={`asset-type-btn ${filters.assetType === type ? 'active' : ''} ${type.toLowerCase().replace(' ', '-')}`}
              onClick={() => setFilters(prev => ({ ...prev, assetType: type }))}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Technical Filters */}
      <FilterPanel 
        title="Technical" 
        icon={BarChart3}
        isOpen={openPanels.technical}
        onToggle={() => togglePanel('technical')}
        color="#00BCD4"
      >
        <RangeSlider
          label="RSI Range"
          min={0}
          max={100}
          value={filters.rsiRange}
          onChange={(val) => setFilters(prev => ({ ...prev, rsiRange: val }))}
        />
        <SelectFilter
          label="EMA Crossover"
          options={filterOptions.emaCrossovers}
          value={filters.emaCrossover}
          onChange={(val) => setFilters(prev => ({ ...prev, emaCrossover: val }))}
        />
        <SelectFilter
          label="MACD Signal"
          options={filterOptions.macdSignals}
          value={filters.macdSignal}
          onChange={(val) => setFilters(prev => ({ ...prev, macdSignal: val }))}
        />
        <SingleSlider
          label="Volume Spike Multiplier"
          min={0.5}
          max={5}
          step={0.1}
          value={filters.volumeSpike}
          onChange={(val) => setFilters(prev => ({ ...prev, volumeSpike: val }))}
          unit="x"
        />
        <SelectFilter
          label="Supertrend"
          options={filterOptions.supertrendOptions}
          value={filters.supertrend}
          onChange={(val) => setFilters(prev => ({ ...prev, supertrend: val }))}
        />
        <RangeSlider
          label="52W High/Low %"
          min={0}
          max={100}
          value={filters.fiftyTwoWeekRange}
          onChange={(val) => setFilters(prev => ({ ...prev, fiftyTwoWeekRange: val }))}
          unit="%"
        />
        <SelectFilter
          label="Bollinger Band"
          options={filterOptions.bollingerStatus}
          value={filters.bollingerStatus}
          onChange={(val) => setFilters(prev => ({ ...prev, bollingerStatus: val }))}
        />
      </FilterPanel>

      {/* Fundamental Filters */}
      <FilterPanel 
        title="Fundamental" 
        icon={Building2}
        isOpen={openPanels.fundamental}
        onToggle={() => togglePanel('fundamental')}
        color="#4CAF50"
      >
        <RangeSlider
          label="P/E Ratio"
          min={0}
          max={100}
          value={filters.peRange}
          onChange={(val) => setFilters(prev => ({ ...prev, peRange: val }))}
        />
        <SingleSlider
          label="ROE Min"
          min={0}
          max={50}
          value={filters.roeMin}
          onChange={(val) => setFilters(prev => ({ ...prev, roeMin: val }))}
          unit="%"
        />
        <SingleSlider
          label="Debt/Equity Max"
          min={0}
          max={5}
          step={0.1}
          value={filters.debtEquityMax}
          onChange={(val) => setFilters(prev => ({ ...prev, debtEquityMax: val }))}
        />
        <SingleSlider
          label="Revenue Growth Min"
          min={0}
          max={50}
          value={filters.revenueGrowthMin}
          onChange={(val) => setFilters(prev => ({ ...prev, revenueGrowthMin: val }))}
          unit="%"
        />
        <SingleSlider
          label="Promoter Holding Min"
          min={0}
          max={100}
          value={filters.promoterHoldingMin}
          onChange={(val) => setFilters(prev => ({ ...prev, promoterHoldingMin: val }))}
          unit="%"
        />
        <ToggleFilter
          label="FCF Positive Only"
          value={filters.fcfPositive}
          onChange={(val) => setFilters(prev => ({ ...prev, fcfPositive: val }))}
        />
        <MultiSelectFilter
          label="Market Cap"
          options={filterOptions.marketCapCategories}
          value={filters.marketCapCategory}
          onChange={(val) => setFilters(prev => ({ ...prev, marketCapCategory: val }))}
        />
      </FilterPanel>

      {/* Macro Filters */}
      <FilterPanel 
        title="Macro" 
        icon={Globe}
        isOpen={openPanels.macro}
        onToggle={() => togglePanel('macro')}
        color="#FF9800"
      >
        <SelectFilter
          label="FII Net Flow"
          options={['Positive', 'Negative', 'All']}
          value={filters.fiiNetFlow}
          onChange={(val) => setFilters(prev => ({ ...prev, fiiNetFlow: val }))}
        />
        <SelectFilter
          label="India VIX Range"
          options={['<15 (Calm)', '15-20 (Normal)', '>20 (Fear)', 'All']}
          value={filters.vixRange}
          onChange={(val) => setFilters(prev => ({ ...prev, vixRange: val }))}
        />
        <div className="filter-group">
          <span className="filter-group-label">Sector Sensitivity</span>
          <SelectFilter
            label="To Crude"
            options={filterOptions.sectorSensitivities}
            value={filters.sectorSensitivity.crude}
            onChange={(val) => setFilters(prev => ({ 
              ...prev, 
              sectorSensitivity: { ...prev.sectorSensitivity, crude: val }
            }))}
          />
          <SelectFilter
            label="To Rupee"
            options={filterOptions.sectorSensitivities}
            value={filters.sectorSensitivity.rupee}
            onChange={(val) => setFilters(prev => ({ 
              ...prev, 
              sectorSensitivity: { ...prev.sectorSensitivity, rupee: val }
            }))}
          />
          <SelectFilter
            label="To Interest Rate"
            options={filterOptions.sectorSensitivities}
            value={filters.sectorSensitivity.rate}
            onChange={(val) => setFilters(prev => ({ 
              ...prev, 
              sectorSensitivity: { ...prev.sectorSensitivity, rate: val }
            }))}
          />
        </div>
        <SelectFilter
          label="GDP Growth Quartile"
          options={filterOptions.gdpQuartiles}
          value={filters.gdpQuartile}
          onChange={(val) => setFilters(prev => ({ ...prev, gdpQuartile: val }))}
        />
      </FilterPanel>

      {/* Micro Filters */}
      <FilterPanel 
        title="Micro" 
        icon={Microscope}
        isOpen={openPanels.micro}
        onToggle={() => togglePanel('micro')}
        color="#9C27B0"
      >
        <p className="filter-info">
          Micro factors are calculated based on company-specific metrics including market cap category, 
          daily momentum, promoter quality, and capital efficiency.
        </p>
        <div className="filter-scores">
          <div className="score-legend">
            <span className="legend-item">
              <span className="legend-dot" style={{ background: '#00C853' }} />
              Large Cap: +5 pts
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: '#FFD600' }} />
              Mid Cap: +4 pts
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: '#FF9800' }} />
              Small Cap: +3 pts
            </span>
          </div>
        </div>
      </FilterPanel>

      {/* Sentiment Filters */}
      <FilterPanel 
        title="Sentiment" 
        icon={MessageSquare}
        isOpen={openPanels.sentiment}
        onToggle={() => togglePanel('sentiment')}
        color="#E91E63"
      >
        <RangeSlider
          label="PCR Range"
          min={0.5}
          max={1.5}
          step={0.05}
          value={filters.pcrRange}
          onChange={(val) => setFilters(prev => ({ ...prev, pcrRange: val }))}
        />
        <SelectFilter
          label="OI Buildup Type"
          options={filterOptions.oiBuildupTypes}
          value={filters.oiBuildup}
          onChange={(val) => setFilters(prev => ({ ...prev, oiBuildup: val }))}
        />
        <MultiSelectFilter
          label="Analyst Consensus"
          options={filterOptions.analystRatings}
          value={filters.analystConsensus}
          onChange={(val) => setFilters(prev => ({ ...prev, analystConsensus: val }))}
        />
        <ToggleFilter
          label="Insider Activity"
          value={filters.insiderActivity}
          onChange={(val) => setFilters(prev => ({ ...prev, insiderActivity: val }))}
        />
      </FilterPanel>
    </div>
  );
};

export default FilterSidebar;
