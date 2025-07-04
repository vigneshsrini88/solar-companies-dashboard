import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import './App.css';

const SolarCompaniesComparison = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Live stock prices using Financial Modeling Prep
  const [livePrices, setLivePrices] = useState({ waaree: null, premier: null });
  const [loading, setLoading] = useState(false);
  const FMP_API_KEY = '2PHeFKYDhlqpGf6tbDumzXgndUjxAYsn';

  const fetchPrice = async (symbol) => {
    const res = await fetch(
      `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${FMP_API_KEY}`
    );
    if (!res.ok) {
      throw new Error('Failed to fetch price');
    }
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  };

  const loadPrices = async () => {
    setLoading(true);
    try {
      const [waaree, premier] = await Promise.all([
        fetchPrice('WAAREEENER.NS'),
        fetchPrice('PREMIERENE.NS'),
      ]);
      setLivePrices({ waaree, premier });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, []);

  // Data extracted from the article
  const companyOverview = [
    { metric: 'Founded', Waaree: 1990, Premier: 1995 },
    { metric: 'Market Cap (₹ Cr)', Waaree: 85935, Premier: 47796 },
    { metric: 'Stock Price (₹)', Waaree: 3014, Premier: 1069 },
    { metric: 'Market Share (%)', Waaree: 14.1, Premier: 0 }
  ];

  const financialPerformance = [
    { metric: 'Q4 Revenue', Waaree: 4004, Premier: 1621 },
    { metric: 'Q4 Net Profit', Waaree: 644, Premier: 278 },
    { metric: 'Revenue Growth', Waaree: 36, Premier: 44 },
    { metric: 'Profit Growth', Waaree: 36, Premier: 167 },
    { metric: '3-Yr CAGR', Waaree: 72, Premier: 106 }
  ];

  const capacityData = [
    { type: 'Solar Module (GW)', Waaree: 15, Premier: 5.1 },
    { type: 'Solar Cell (GW)', Waaree: 5.4, Premier: 3.2 },
    { type: 'Planned Total (GW)', Waaree: 19.8, Premier: 11.1 }
  ];

  const radarData = [
    { subject: 'Market Cap', WaareeScore: 100, PremierScore: 56 },
    { subject: 'Revenue Size', WaareeScore: 100, PremierScore: 40 },
    { subject: 'Growth Rate', WaareeScore: 68, PremierScore: 100 },
    { subject: 'International Exposure', WaareeScore: 57, PremierScore: 1 },
    { subject: 'Manufacturing Scale', WaareeScore: 100, PremierScore: 74 },
    { subject: 'Order Book', WaareeScore: 100, PremierScore: 18 }
  ];

  const futureInvestments = [
    { company: 'Waaree', investment: 9000, description: 'PLI Project - Integrated facility' },
    { company: 'Premier', investment: 12500, description: '3-year capex plan' }
  ];

  // Inline styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
      background: 'linear-gradient(135deg, #e3f2fd, #e8f5e8)',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#666'
    },
    tabContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '32px',
      gap: '4px'
    },
    tab: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px 8px 0 0',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    activeTab: {
      backgroundColor: '#1976d2',
      color: 'white'
    },
    inactiveTab: {
      backgroundColor: '#e0e0e0',
      color: '#333'
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px'
    },
    card: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '16px',
      textAlign: 'center'
    },
    metricCard: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    },
    metricTitle: {
      fontWeight: '600',
      color: '#333',
      marginBottom: '12px'
    },
    metricRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px',
      marginBottom: '8px',
      borderRadius: '6px'
    },
    waareeRow: {
      backgroundColor: '#e3f2fd'
    },
    premierRow: {
      backgroundColor: '#fff3e0'
    },
    companyLabel: {
      fontWeight: '500'
    },
    waareeLabel: {
      color: '#1976d2'
    },
    premierLabel: {
      color: '#f57c00'
    },
    metricValue: {
      fontWeight: 'bold'
    },
    summaryCard: {
      background: 'linear-gradient(135deg, #1976d2, #4caf50)',
      color: 'white',
      padding: '24px',
      borderRadius: '12px',
      marginTop: '32px'
    },
    summaryTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '16px'
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    summarySection: {
      fontSize: '0.9rem'
    },
    summarySubtitle: {
      fontWeight: '600',
      marginBottom: '8px'
    },
    summaryList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    summaryListItem: {
      marginBottom: '4px'
    }
  };

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      style={{
        ...styles.tab,
        ...(active ? styles.activeTab : styles.inactiveTab)
      }}
    >
      {label}
    </button>
  );

  const MetricCard = ({ title, waareeValue, premierValue, unit = '', type = 'number' }) => (
    <div style={styles.metricCard}>
      <div style={styles.metricTitle}>{title}</div>
      <div style={{...styles.metricRow, ...styles.waareeRow}}>
        <span style={{...styles.companyLabel, ...styles.waareeLabel}}>Waaree:</span>
        <span style={styles.metricValue}>
          {type === 'currency' ? '₹' : ''}{waareeValue}{unit}
        </span>
      </div>
      <div style={{...styles.metricRow, ...styles.premierRow}}>
        <span style={{...styles.companyLabel, ...styles.premierLabel}}>Premier:</span>
        <span style={styles.metricValue}>
          {type === 'currency' ? '₹' : ''}{premierValue}{unit}
        </span>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Solar Energy Giants Comparison</h1>
        <p style={styles.subtitle}>Waaree Energies vs Premier Energies - Data-Driven Analysis</p>
      </div>

      <div style={styles.tabContainer}>
        <TabButton id="overview" label="Company Overview" active={activeTab === 'overview'} onClick={setActiveTab} />
        <TabButton id="financial" label="Financial Performance" active={activeTab === 'financial'} onClick={setActiveTab} />
        <TabButton id="capacity" label="Manufacturing & Orders" active={activeTab === 'capacity'} onClick={setActiveTab} />
        <TabButton id="strategy" label="Future Strategy" active={activeTab === 'strategy'} onClick={setActiveTab} />
      </div>

      <div style={styles.contentContainer}>
        {activeTab === 'overview' && (
          <>
            <div style={styles.cardGrid}>
              <MetricCard title="Founded Year" waareeValue="1990" premierValue="1995" />
              <MetricCard title="Market Cap" waareeValue="85,935" premierValue="47,796" unit=" Cr" type="currency" />
              <MetricCard title="Stock Price" waareeValue="3,014" premierValue="1,069" unit="" type="currency" />
              <MetricCard title="Current Price (Live)" 
                waareeValue={livePrices.waaree ? livePrices.waaree.price : (loading ? 'Loading' : 'N/A')} 
                premierValue={livePrices.premier ? livePrices.premier.price : (loading ? 'Loading' : 'N/A')} 
                type="currency" 
              />
              <MetricCard title="Market Share" waareeValue="14.1" premierValue="N/A" unit="%" />
            </div>
            <div style={{textAlign:'right', margin:'8px 0'}}>
              <button onClick={loadPrices} disabled={loading} style={{padding:'6px 12px', border:'none', borderRadius:'4px', backgroundColor:'#1976d2', color:'#fff', cursor:loading?'not-allowed':'pointer'}}>
                {loading ? 'Refreshing...' : 'Refresh Prices'}
              </button>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Company Strength Radar</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Waaree" dataKey="WaareeScore" stroke="#1976d2" fill="#1976d2" fillOpacity={0.3} />
                  <Radar name="Premier" dataKey="PremierScore" stroke="#f57c00" fill="#f57c00" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div style={styles.cardGrid}>
              <div style={styles.card}>
                <h3 style={{...styles.cardTitle, textAlign: 'left'}}>Key Differentiators</h3>
                <div style={{marginBottom: '16px', paddingLeft: '16px', borderLeft: '4px solid #1976d2'}}>
                  <h4 style={{color: '#1976d2', marginBottom: '8px'}}>Waaree Energies</h4>
                  <ul style={{fontSize: '0.9rem', color: '#666'}}>
                    <li>India's largest solar module manufacturer</li>
                    <li>Strong international presence (57% overseas orders)</li>
                    <li>Market leader with 14.1% market share</li>
                    <li>Integrated value chain approach</li>
                  </ul>
                </div>
                <div style={{paddingLeft: '16px', borderLeft: '4px solid #f57c00'}}>
                  <h4 style={{color: '#f57c00', marginBottom: '8px'}}>Premier Energies</h4>
                  <ul style={{fontSize: '0.9rem', color: '#666'}}>
                    <li>Higher revenue growth rate (106% vs 72% CAGR)</li>
                    <li>Backed by GEF Capital (Washington D.C.)</li>
                    <li>Focused on domestic market (99% orders)</li>
                    <li>Aggressive expansion plans</li>
                  </ul>
                </div>
              </div>

              <div style={styles.card}>
                <h3 style={{...styles.cardTitle, textAlign: 'left'}}>Stock Performance Since Listing</h3>
                <div style={{backgroundColor: '#e3f2fd', padding: '16px', borderRadius: '8px', marginBottom: '12px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontWeight: '600', color: '#1976d2'}}>Waaree (Listed Oct 2024)</span>
                    <span style={{fontWeight: 'bold', color: '#4caf50'}}>+27%</span>
                  </div>
                </div>
                <div style={{backgroundColor: '#fff3e0', padding: '16px', borderRadius: '8px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontWeight: '600', color: '#f57c00'}}>Premier (Listed Sep 2024)</span>
                    <span style={{fontWeight: 'bold', color: '#4caf50'}}>+26%</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'financial' && (
          <>
            <div style={styles.cardGrid}>
              <MetricCard title="Q4 FY25 Revenue" waareeValue="4,004" premierValue="1,621" unit=" Cr" type="currency" />
              <MetricCard title="Q4 FY25 Net Profit" waareeValue="644" premierValue="278" unit=" Cr" type="currency" />
              <MetricCard title="Revenue Growth Q4" waareeValue="36" premierValue="44" unit="%" />
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Financial Performance Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={financialPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'Waaree') return [`₹${value} Cr`, 'Waaree Energies'];
                      if (name === 'Premier') return [`₹${value} Cr`, 'Premier Energies'];
                      return [value, name];
                    }}
                    labelFormatter={(label) => {
                      const labelMap = {
                        'Q4 Revenue': 'Q4 FY25 Revenue (₹ Cr)',
                        'Q4 Net Profit': 'Q4 FY25 Net Profit (₹ Cr)', 
                        'Revenue Growth': 'Revenue Growth Q4 (%)',
                        'Profit Growth': 'Profit Growth Q4 (%)',
                        '3-Yr CAGR': '3-Year Revenue CAGR (%)'
                      };
                      return labelMap[label] || label;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Waaree" fill="#1976d2" name="Waaree" />
                  <Bar dataKey="Premier" fill="#f57c00" name="Premier" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'capacity' && (
          <>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Manufacturing Capacity Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={capacityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`${value} GW`, name]}
                    labelFormatter={(label) => {
                      const labelMap = {
                        'Solar Module (GW)': 'Current Solar Module Capacity',
                        'Solar Cell (GW)': 'Solar Cell Capacity', 
                        'Planned Total (GW)': 'Total Planned Capacity'
                      };
                      return labelMap[label] || label;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Waaree" fill="#1976d2" name="Waaree" />
                  <Bar dataKey="Premier" fill="#f57c00" name="Premier" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={styles.cardGrid}>
              <div style={styles.card}>
                <h3 style={{...styles.cardTitle, textAlign: 'left'}}>Order Book Analysis</h3>
                <MetricCard title="Total Order Book" waareeValue="47,000" premierValue="8,446" unit=" Cr" type="currency" />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px'}}>
                  <div style={{textAlign: 'center'}}>
                    <h4 style={{color: '#1976d2', marginBottom: '8px'}}>Waaree Orders</h4>
                    <div style={{backgroundColor: '#e3f2fd', padding: '8px', borderRadius: '6px', marginBottom: '8px'}}>
                      <span style={{fontSize: '0.9rem'}}>Domestic: 43%</span>
                    </div>
                    <div style={{backgroundColor: '#bbdefb', padding: '8px', borderRadius: '6px'}}>
                      <span style={{fontSize: '0.9rem'}}>International: 57%</span>
                    </div>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <h4 style={{color: '#f57c00', marginBottom: '8px'}}>Premier Orders</h4>
                    <div style={{backgroundColor: '#fff3e0', padding: '8px', borderRadius: '6px', marginBottom: '8px'}}>
                      <span style={{fontSize: '0.9rem'}}>Domestic: 99%</span>
                    </div>
                    <div style={{backgroundColor: '#ffcc02', padding: '8px', borderRadius: '6px'}}>
                      <span style={{fontSize: '0.9rem'}}>International: 1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'strategy' && (
          <>
            <div style={styles.cardGrid}>
              <div style={styles.card}>
                <h3 style={{...styles.cardTitle, color: '#1976d2', textAlign: 'left'}}>Waaree's Future Strategy</h3>
                <div style={{backgroundColor: '#e3f2fd', padding: '16px', borderRadius: '8px', marginBottom: '16px'}}>
                  <h4 style={{marginBottom: '8px'}}>EBITDA Guidance FY26</h4>
                  <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2', margin: '4px 0'}}>₹5,500-6,000 Cr</p>
                  <p style={{fontSize: '0.9rem', color: '#666', margin: 0}}>vs ₹3,123 Cr in FY25</p>
                </div>
                <div>
                  <h4 style={{marginBottom: '8px'}}>Key Expansion Plans:</h4>
                  <ul style={{fontSize: '0.9rem', color: '#666'}}>
                    <li>Additional 4.8 GW cell & module capacity</li>
                    <li>6 GW integrated ingots-wafer-cell-module facility</li>
                    <li>₹9,000 Cr PLI project by FY27</li>
                    <li>3 GW inverter manufacturing by end FY26</li>
                    <li>Battery & green hydrogen from FY27</li>
                  </ul>
                </div>
              </div>

              <div style={styles.card}>
                <h3 style={{...styles.cardTitle, color: '#f57c00', textAlign: 'left'}}>Premier's Future Strategy</h3>
                <div style={{backgroundColor: '#fff3e0', padding: '16px', borderRadius: '8px', marginBottom: '16px'}}>
                  <h4 style={{marginBottom: '8px'}}>Total Capex Plan</h4>
                  <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#f57c00', margin: '4px 0'}}>₹12,500 Cr</p>
                  <p style={{fontSize: '0.9rem', color: '#666', margin: 0}}>Over next 3 years</p>
                </div>
                <div>
                  <h4 style={{marginBottom: '8px'}}>Key Expansion Plans:</h4>
                  <ul style={{fontSize: '0.9rem', color: '#666'}}>
                    <li>10 GW integrated capacity by FY28</li>
                    <li>4.8 GW cell + 5.6 GW module lines by FY27</li>
                    <li>1.2 GW cell line in US (pending policy)</li>
                    <li>BESS and inverter business expansion</li>
                    <li>Target 2.2x-2.5x asset turnover ratio</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Investment Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={futureInvestments} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="company" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value} Cr`, 'Investment']} />
                  <Bar dataKey="investment" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      <div style={styles.summaryCard}>
        <h3 style={styles.summaryTitle}>Investment Decision Framework</h3>
        <div style={styles.summaryGrid}>
          <div style={styles.summarySection}>
            <h4 style={styles.summarySubtitle}>Choose Waaree if you prefer:</h4>
            <ul style={styles.summaryList}>
              <li style={styles.summaryListItem}>✓ Established market leader with proven track record</li>
              <li style={styles.summaryListItem}>✓ International diversification and lower risk</li>
              <li style={styles.summaryListItem}>✓ Larger scale and market share</li>
              <li style={styles.summaryListItem}>✓ Stable growth with predictable returns</li>
            </ul>
          </div>
          <div style={styles.summarySection}>
            <h4 style={styles.summarySubtitle}>Choose Premier if you prefer:</h4>
            <ul style={styles.summaryList}>
              <li style={styles.summaryListItem}>✓ Higher growth potential and faster scaling</li>
              <li style={styles.summaryListItem}>✓ Exposure to rapidly growing domestic market</li>
              <li style={styles.summaryListItem}>✓ More aggressive expansion strategy</li>
              <li style={styles.summaryListItem}>✓ Potentially higher returns with higher risk</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <SolarCompaniesComparison />
    </div>
  );
}

export default App;