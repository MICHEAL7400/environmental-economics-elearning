import React, { useState } from 'react';

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    projectType: 'solar',
    initialInvestment: '',
    annualSavings: '',
    maintenanceCost: '',
    projectLifetime: '25',
    discountRate: '8'
  });

  const [results, setResults] = useState(null);

  const projectTypes = {
    solar: {
      name: 'Solar Power Installation',
      icon: '☀️',
      typicalLifetime: 25,
      description: 'Residential or commercial solar panel system'
    },
    wind: {
      name: 'Wind Turbine',
      icon: '💨',
      typicalLifetime: 20,
      description: 'Small-scale wind energy generation'
    },
    efficiency: {
      name: 'Energy Efficiency',
      icon: '💡',
      typicalLifetime: 15,
      description: 'Building insulation, efficient appliances'
    },
    ev: {
      name: 'Electric Vehicle',
      icon: '🚗',
      typicalLifetime: 10,
      description: 'Transition to electric transportation'
    },
    water: {
      name: 'Water Conservation',
      icon: '💧',
      typicalLifetime: 20,
      description: 'Rainwater harvesting, efficient irrigation'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-fill typical lifetime when project type changes
    if (name === 'projectType' && projectTypes[value]) {
      setFormData(prev => ({
        ...prev,
        projectLifetime: projectTypes[value].typicalLifetime.toString()
      }));
    }
  };

  const calculateROI = () => {
    const initial = parseFloat(formData.initialInvestment);
    const annualSavings = parseFloat(formData.annualSavings);
    const maintenance = parseFloat(formData.maintenanceCost) || 0;
    const lifetime = parseFloat(formData.projectLifetime);
    const discountRate = parseFloat(formData.discountRate) / 100;

    if (!initial || !annualSavings || !lifetime) return;

    // Simple ROI calculation
    const netAnnualSavings = annualSavings - maintenance;
    const simpleROI = (netAnnualSavings * lifetime - initial) / initial * 100;
    
    // NPV calculation
    let npv = -initial;
    for (let year = 1; year <= lifetime; year++) {
      npv += netAnnualSavings / Math.pow(1 + discountRate, year);
    }

    // Payback period
    const paybackPeriod = initial / netAnnualSavings;

    setResults({
      simpleROI,
      npv,
      paybackPeriod,
      totalSavings: netAnnualSavings * lifetime,
      netBenefits: netAnnualSavings * lifetime - initial
    });
  };

  return (
    <div className="roi-calculator">
      <div className="calculator-header">
        <h1>💰 Green Investment ROI Calculator</h1>
        <p>Analyze the financial viability of environmental projects in African contexts</p>
      </div>

      <div className="calculator-layout">
        <div className="calculator-form">
          <div className="form-section">
            <h3>Project Details</h3>
            <div className="form-group">
              <label>Project Type</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
              >
                {Object.entries(projectTypes).map(([key, project]) => (
                  <option key={key} value={key}>
                    {project.icon} {project.name}
                  </option>
                ))}
              </select>
              {formData.projectType && (
                <p className="project-description">
                  {projectTypes[formData.projectType].description}
                </p>
              )}
            </div>

            <div className="form-group">
              <label>Initial Investment ($)</label>
              <input
                type="number"
                name="initialInvestment"
                value={formData.initialInvestment}
                onChange={handleChange}
                placeholder="e.g., 10000"
              />
            </div>

            <div className="form-group">
              <label>Annual Savings ($)</label>
              <input
                type="number"
                name="annualSavings"
                value={formData.annualSavings}
                onChange={handleChange}
                placeholder="e.g., 2000"
              />
            </div>

            <div className="form-group">
              <label>Annual Maintenance Cost ($)</label>
              <input
                type="number"
                name="maintenanceCost"
                value={formData.maintenanceCost}
                onChange={handleChange}
                placeholder="e.g., 200"
              />
            </div>

            <div className="form-group">
              <label>Project Lifetime (years)</label>
              <input
                type="number"
                name="projectLifetime"
                value={formData.projectLifetime}
                onChange={handleChange}
                placeholder="e.g., 25"
              />
            </div>

            <div className="form-group">
              <label>Discount Rate (%)</label>
              <input
                type="number"
                name="discountRate"
                value={formData.discountRate}
                onChange={handleChange}
                placeholder="e.g., 8"
                step="0.1"
              />
              <p className="help-text">Used for Net Present Value calculation</p>
            </div>
          </div>

          <button className="calculate-btn" onClick={calculateROI}>
            Calculate ROI
          </button>
        </div>

        <div className="results-panel">
          {results ? (
            <div className="results-content">
              <div className="results-header">
                <h2>Investment Analysis</h2>
                <div className="project-badge">
                  {projectTypes[formData.projectType].icon}
                  {projectTypes[formData.projectType].name}
                </div>
              </div>

              <div className="metrics-grid">
                <div className="metric-card primary">
                  <div className="metric-value">
                    {results.simpleROI > 0 ? '+' : ''}{results.simpleROI.toFixed(1)}%
                  </div>
                  <div className="metric-label">Simple ROI</div>
                  <div className="metric-description">Total return over project lifetime</div>
                </div>

                <div className="metric-card">
                  <div className="metric-value">
                    ${results.npv > 0 ? '+' : ''}{results.npv.toFixed(0)}
                  </div>
                  <div className="metric-label">Net Present Value</div>
                  <div className="metric-description">Current value of future savings</div>
                </div>

                <div className="metric-card">
                  <div className="metric-value">{results.paybackPeriod.toFixed(1)} years</div>
                  <div className="metric-label">Payback Period</div>
                  <div className="metric-description">Time to recover investment</div>
                </div>

                <div className="metric-card">
                  <div className="metric-value">${results.totalSavings.toFixed(0)}</div>
                  <div className="metric-label">Total Savings</div>
                  <div className="metric-description">Lifetime financial benefits</div>
                </div>
              </div>

              <div className="interpretation">
                <h3>💡 Analysis</h3>
                {results.npv > 0 ? (
                  <div className="positive-result">
                    <strong>✅ Good Investment:</strong> This project shows positive financial returns. 
                    The NPV of ${results.npv.toFixed(0)} indicates it's financially viable.
                  </div>
                ) : (
                  <div className="negative-result">
                    <strong>⚠️ Consider Carefully:</strong> The financial returns may not justify the investment. 
                    Consider non-financial benefits like environmental impact.
                  </div>
                )}

                <div className="key-insights">
                  <h4>Key Insights:</h4>
                  <ul>
                    <li>Payback in <strong>{results.paybackPeriod.toFixed(1)} years</strong></li>
                    <li><strong>{results.simpleROI.toFixed(1)}%</strong> return on investment</li>
                    <li><strong>${results.netBenefits.toFixed(0)}</strong> net benefits over lifetime</li>
                  </ul>
                </div>
              </div>

              <div className="sensitivity-analysis">
                <h3>📊 Sensitivity Analysis</h3>
                <p>How changes in key assumptions affect your ROI:</p>
                <div className="sensitivity-grid">
                  <div className="sensitivity-item">
                    <label>If savings are 20% lower:</label>
                    <span>{((results.simpleROI * 0.8) - (results.simpleROI * 0.2)).toFixed(1)}% ROI</span>
                  </div>
                  <div className="sensitivity-item">
                    <label>If costs are 20% higher:</label>
                    <span>{(results.simpleROI * 0.9).toFixed(1)}% ROI</span>
                  </div>
                  <div className="sensitivity-item">
                    <label>If lifetime is 5 years shorter:</label>
                    <span>{(results.simpleROI * 0.85).toFixed(1)}% ROI</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-results">
              <div className="empty-icon">📈</div>
              <h3>Analyze Your Green Investment</h3>
              <p>Enter your project details to calculate financial returns and viability.</p>
              <div className="example-projects">
                <h4>💡 Example Projects:</h4>
                <ul>
                  <li><strong>Solar Installation:</strong> $10,000 investment, $1,500 annual savings</li>
                  <li><strong>Energy Efficiency:</strong> $5,000 investment, $800 annual savings</li>
                  <li><strong>Water Conservation:</strong> $3,000 investment, $500 annual savings</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;