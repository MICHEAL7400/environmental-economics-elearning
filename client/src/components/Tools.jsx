// client/src/components/Tools.js
import React from 'react';
import './Tools.css';

const Tools = () => {
  return (
    <div className="tools-page">
      <div className="container">
        <div className="page-header">
          <h1>🛠️ Practical Tools & Calculators</h1>
          <p>Interactive tools to apply environmental economics in real-world scenarios</p>
        </div>

        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon">📊</div>
            <h3>Carbon Footprint Calculator</h3>
            <p>Calculate organizational or personal carbon emissions with African-specific emission factors</p>
            <div className="tool-features">
              <span>🌍 African Context</span>
              <span>📈 Custom Scenarios</span>
              <span>📋 Action Plans</span>
            </div>
            <button className="tool-button">Launch Calculator →</button>
          </div>

          <div className="tool-card">
            <div className="tool-icon">💰</div>
            <h3>Cost-Benefit Analysis Tool</h3>
            <p>Analyze economic viability of environmental projects with built-in African economic parameters</p>
            <div className="tool-features">
              <span>📊 Multiple Scenarios</span>
              <span>🌱 Environmental Valuation</span>
              <span>📋 Report Generation</span>
            </div>
            <button className="tool-button">Start Analysis →</button>
          </div>

          <div className="tool-card">
            <div className="tool-icon">📈</div>
            <h3>Green Investment ROI Calculator</h3>
            <p>Calculate returns on renewable energy, conservation, and sustainability investments</p>
            <div className="tool-features">
              <span>💸 Investment Analysis</span>
              <span>🔄 Payback Period</span>
              <span>📊 Sensitivity Analysis</span>
            </div>
            <button className="tool-button">Calculate ROI →</button>
          </div>

          <div className="tool-card">
            <div className="tool-icon">⚖️</div>
            <h3>Policy Impact Simulator</h3>
            <p>Simulate economic impacts of environmental policies in African contexts</p>
            <div className="tool-features">
              <span>🏛️ Policy Scenarios</span>
              <span>📈 Economic Modeling</span>
              <span>👥 Stakeholder Impact</span>
            </div>
            <button className="tool-button">Run Simulation →</button>
          </div>
        </div>

        {/* Carbon Calculator Implementation */}
        <div className="calculator-section">
          <h2>🌱 Quick Carbon Footprint Estimate</h2>
          <div className="carbon-calculator">
            <div className="calculator-step">
              <label>Energy Consumption (kWh/month):</label>
              <input type="number" placeholder="e.g., 500" />
            </div>
            <div className="calculator-step">
              <label>Transportation (km/week):</label>
              <input type="number" placeholder="e.g., 200" />
            </div>
            <div className="calculator-step">
              <label>Diet Type:</label>
              <select>
                <option value="vegetarian">Vegetarian</option>
                <option value="mixed">Mixed</option>
                <option value="meat-heavy">Meat Heavy</option>
              </select>
            </div>
            <button className="calculate-btn">Calculate My Footprint</button>
            <div className="result-panel">
              <h4>Estimated Annual Carbon Footprint: <span className="result">4.2 tons CO₂e</span></h4>
              <p>🌍 African Average: 1.8 tons CO₂e | 🌏 Global Average: 4.8 tons CO₂e</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;