// client/src/components/Admin/Analytics.jsx - FIXED
import React, { useState, useEffect } from 'react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    // Fetch analytics data
    const fetchAnalytics = async () => {
      // Mock data
      setAnalyticsData({
        userGrowth: [65, 78, 90, 110, 145, 178, 210, 245, 280, 310, 350, 400],
        courseCompletions: [45, 52, 68, 74, 82, 95, 110, 125, 140, 155, 170, 190],
        revenue: [1200, 1350, 1480, 1620, 1750, 1900, 2100, 2300, 2550, 2800, 3100, 3500],
        topCourses: [
          { name: 'Environmental Economics', students: 450, completion: 85 },
          { name: 'Carbon Pricing', students: 320, completion: 78 },
          { name: 'Climate Finance', students: 280, completion: 92 },
          { name: 'Renewable Energy', students: 240, completion: 75 },
          { name: 'Circular Economy', students: 190, completion: 88 }
        ]
      });
    };

    fetchAnalytics();
  }, [timeRange]);

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>📈 Analytics Dashboard</h2>
        <div className="time-filter">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      <div className="page-content">
        {/* Key Metrics */}
        <div className="metrics-grid">
          <div className="metric-card large">
            <h3>📈 User Growth</h3>
            <div className="metric-value">+24%</div>
            <div className="metric-subtitle">This month</div>
            <div className="chart-placeholder">
              [User Growth Chart]
            </div>
          </div>

          <div className="metric-card">
            <h3>👥 Total Users</h3>
            <div className="metric-value">15,234</div>
            <div className="metric-change positive">+12%</div>
          </div>

          <div className="metric-card">
            <h3>📚 Course Completions</h3>
            <div className="metric-value">1,890</div>
            <div className="metric-change positive">+8%</div>
          </div>

          <div className="metric-card">
            <h3>💰 Revenue</h3>
            <div className="metric-value">$45,200</div>
            <div className="metric-change positive">+15%</div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Top Performing Courses</h3>
            <div className="courses-list">
              {analyticsData.topCourses?.map((course, index) => (
                <div key={index} className="course-item">
                  <div className="course-info">
                    <h4>{course.name}</h4>
                    <span>{course.students} students</span>
                  </div>
                  <div className="completion-rate">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                    <span>{course.completion}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card">
            <h3>User Engagement</h3>
            <div className="engagement-metrics">
              <div className="engagement-item">
                <span>Average Session Duration</span>
                <strong>12.5 minutes</strong>
              </div>
              <div className="engagement-item">
                <span>Returning Users</span>
                <strong>68%</strong>
              </div>
              <div className="engagement-item">
                <span>Course Completion Rate</span>
                <strong>72%</strong>
              </div>
              <div className="engagement-item">
                <span>Mobile Users</span>
                <strong>45%</strong>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h3>Geographic Distribution</h3>
            <div className="geo-data">
              <div className="country-item">
                <span>🇳🇬 Nigeria</span>
                <strong>32%</strong>
              </div>
              <div className="country-item">
                <span>🇰🇪 Kenya</span>
                <strong>18%</strong>
              </div>
              <div className="country-item">
                <span>🇿🇦 South Africa</span>
                <strong>15%</strong>
              </div>
              <div className="country-item">
                <span>🇬🇭 Ghana</span>
                <strong>12%</strong>
              </div>
              <div className="country-item">
                <span>Other</span>
                <strong>23%</strong>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h3>Revenue Sources</h3>
            <div className="revenue-sources">
              <div className="source-item">
                <span>Course Sales</span>
                <strong>$28,500</strong>
              </div>
              <div className="source-item">
                <span>Subscriptions</span>
                <strong>$12,300</strong>
              </div>
              <div className="source-item">
                <span>Certifications</span>
                <strong>$3,200</strong>
              </div>
              <div className="source-item">
                <span>Consulting</span>
                <strong>$1,200</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="export-section">
          <h3>Export Data</h3>
          <div className="export-options">
            <button className="btn-secondary">📊 Export Analytics</button>
            <button className="btn-secondary">👥 Export User Data</button>
            <button className="btn-secondary">📚 Export Course Data</button>
            <button className="btn-secondary">💰 Export Revenue Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; // ADD THIS EXPORT