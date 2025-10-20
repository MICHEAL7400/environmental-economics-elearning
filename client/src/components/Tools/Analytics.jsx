import React, { useState, useEffect } from 'react';
import './Tools.css';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [metrics, setMetrics] = useState(null);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    // Simulate loading analytics data
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = () => {
    // Mock data - replace with actual API calls
    const mockMetrics = {
      week: {
        carbonReduction: 24.5,
        energySaved: 156,
        waterConserved: 890,
        wasteDiverted: 45,
        activeUsers: 128,
        coursesCompleted: 67
      },
      month: {
        carbonReduction: 98.2,
        energySaved: 625,
        waterConserved: 3560,
        wasteDiverted: 180,
        activeUsers: 512,
        coursesCompleted: 245
      },
      year: {
        carbonReduction: 1250.8,
        energySaved: 7850,
        waterConserved: 42800,
        wasteDiverted: 2150,
        activeUsers: 2845,
        coursesCompleted: 1567
      }
    };

    const mockTrends = {
      week: [
        { day: 'Mon', carbon: 3.2, energy: 20, water: 120 },
        { day: 'Tue', carbon: 3.5, energy: 22, water: 125 },
        { day: 'Wed', carbon: 3.1, energy: 19, water: 118 },
        { day: 'Thu', carbon: 3.8, energy: 24, water: 135 },
        { day: 'Fri', carbon: 4.2, energy: 26, water: 145 },
        { day: 'Sat', carbon: 3.9, energy: 25, water: 140 },
        { day: 'Sun', carbon: 3.4, energy: 20, water: 107 }
      ],
      month: [
        { week: 'Week 1', carbon: 22, energy: 140, water: 800 },
        { week: 'Week 2', carbon: 24, energy: 155, water: 870 },
        { week: 'Week 3', carbon: 26, energy: 165, water: 920 },
        { week: 'Week 4', carbon: 28, energy: 175, water: 970 }
      ],
      year: [
        { month: 'Jan', carbon: 95, energy: 600, water: 3400 },
        { month: 'Feb', carbon: 98, energy: 620, water: 3500 },
        { month: 'Mar', carbon: 102, energy: 650, water: 3650 },
        { month: 'Apr', carbon: 105, energy: 670, water: 3750 },
        { month: 'May', carbon: 108, energy: 690, water: 3850 },
        { month: 'Jun', carbon: 112, energy: 710, water: 3950 }
      ]
    };

    setMetrics(mockMetrics[timeRange]);
    setTrends(mockTrends[timeRange]);
  };

  const getImprovementPercentage = (current, previous) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  if (!metrics) {
    return <div className="tools-container">Loading analytics...</div>;
  }

  return (
    <div className="tools-container">
      <div className="tools-header">
        <h2>📊 Environmental Analytics</h2>
        <p>Track environmental impact and user engagement metrics</p>
      </div>

      <div className="analytics-controls">
        <div className="time-selector">
          <label>Time Range:</label>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card environmental">
          <h3>🌿 Environmental Impact</h3>
          <div className="metric-item">
            <span className="metric-label">Carbon Reduction</span>
            <span className="metric-value">{metrics.carbonReduction} kg CO₂</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Energy Saved</span>
            <span className="metric-value">{metrics.energySaved} kWh</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Water Conserved</span>
            <span className="metric-value">{metrics.waterConserved} L</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Waste Diverted</span>
            <span className="metric-value">{metrics.wasteDiverted} kg</span>
          </div>
        </div>

        <div className="metric-card engagement">
          <h3>👥 User Engagement</h3>
          <div className="metric-item">
            <span className="metric-label">Active Users</span>
            <span className="metric-value">{metrics.activeUsers}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Courses Completed</span>
            <span className="metric-value">{metrics.coursesCompleted}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Avg. Session Duration</span>
            <span className="metric-value">12.5 min</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Returning Users</span>
            <span className="metric-value">68%</span>
          </div>
        </div>
      </div>

      <div className="trends-section">
        <h3>📈 Trends Over Time</h3>
        <div className="trends-grid">
          {trends.map((trend, index) => (
            <div key={index} className="trend-card">
              <h4>{trend.day || trend.week || trend.month}</h4>
              <div className="trend-metrics">
                <div className="trend-metric">
                  <span>Carbon: {trend.carbon} kg</span>
                </div>
                <div className="trend-metric">
                  <span>Energy: {trend.energy} kWh</span>
                </div>
                <div className="trend-metric">
                  <span>Water: {trend.water} L</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="insights-section">
        <h3>💡 Key Insights</h3>
        <div className="insights-grid">
          <div className="insight-card positive">
            <h4>✅ Positive Trends</h4>
            <ul>
              <li>Carbon reduction increased by 15% this {timeRange}</li>
              <li>User engagement growing steadily</li>
              <li>Waste diversion rates improving</li>
            </ul>
          </div>
          <div className="insight-card opportunity">
            <h4>🎯 Opportunities</h4>
            <ul>
              <li>Focus on water conservation education</li>
              <li>Expand renewable energy content</li>
              <li>Increase community challenges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;