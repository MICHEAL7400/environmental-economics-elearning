// client/src/components/Statistics.js
import React from 'react';

const Statistics = () => {
  const statsData = {
    africa: {
      title: '🌍 Africa Green Economy Overview',
      metrics: [
        { label: 'Renewable Energy Investment', value: '$28.5B', change: '+18%', trend: 'up' },
        { label: 'Green Jobs Created', value: '2.3M', change: '+12%', trend: 'up' },
        { label: 'Carbon Market Value', value: '$4.2B', change: '+25%', trend: 'up' },
        { label: 'Sustainable Agriculture Investment', value: '$15.7B', change: '+8%', trend: 'up' }
      ]
    },
    zambia: {
      title: '🇿🇲 Zambia Environmental Economics',
      metrics: [
        { label: 'Mining Environmental Costs', value: '$450M', change: 'Annual', trend: 'neutral' },
        { label: 'Renewable Energy Potential', value: '6000 MW', change: 'Untapped', trend: 'opportunity' },
        { label: 'Forest Conservation Value', value: '$1.2B', change: 'Ecosystem Services', trend: 'value' },
        { label: 'Climate Finance Flows', value: '$125M', change: 'Annual', trend: 'up' }
      ]
    }
  };

  return (
    <div className="statistics-dashboard">
      <div className="container">
        <div className="page-header">
          <h1>📊 Environmental Economics Statistics</h1>
          <p>Data-driven insights into Africa's green economic transformation</p>
        </div>

        <div className="dashboard-grid">
          {Object.entries(statsData).map(([region, data]) => (
            <div key={region} className="region-card">
              <h2>{data.title}</h2>
              <div className="metrics-grid">
                {data.metrics.map((metric, index) => (
                  <div key={index} className="metric-card">
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-label">{metric.label}</div>
                    <div className={`metric-change ${metric.trend}`}>
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Charts Section */}
        <div className="charts-section">
          <h2>📈 Trend Analysis</h2>
          <div className="charts-grid">
            <div className="chart-card">
              <h3>African Renewable Energy Investment</h3>
              <div className="chart-placeholder">
                [Investment Growth Chart: 2020-2025]
                <div className="chart-bars">
                  <div className="bar" style={{height: '40%'}}>2020</div>
                  <div className="bar" style={{height: '55%'}}>2021</div>
                  <div className="bar" style={{height: '65%'}}>2022</div>
                  <div className="bar" style={{height: '80%'}}>2023</div>
                  <div className="bar" style={{height: '100%'}}>2024</div>
                </div>
              </div>
            </div>
            
            <div className="chart-card">
              <h3>Zambia Environmental Protection Spending</h3>
              <div className="chart-placeholder">
                [Budget Allocation Chart]
                <div className="chart-pie">
                  <div className="slice" style={{'--percentage': '40%'}}>Mining Regulation</div>
                  <div className="slice" style={{'--percentage': '25%'}}>Forest Conservation</div>
                  <div className="slice" style={{'--percentage': '20%'}}>Water Management</div>
                  <div className="slice" style={{'--percentage': '15%'}}>Climate Adaptation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;