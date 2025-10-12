import React, { useState } from 'react';
import './Tools.css';

const CarbonCalculator = () => {
  const [formData, setFormData] = useState({
    // Energy
    electricity: '',
    electricitySource: 'grid',
    // Transportation
    carDistance: '',
    carType: 'petrol',
    flightHours: '',
    busDistance: '',
    // Lifestyle
    diet: 'mixed',
    shopping: 'moderate',
    waste: 'average'
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Emission factors (kg CO2e per unit)
  const emissionFactors = {
    electricity: {
      grid: 0.5, // kg CO2e per kWh (African grid average)
      solar: 0.05,
      hydro: 0.01,
      wind: 0.01
    },
    transportation: {
      car: {
        petrol: 0.21, // kg CO2e per km
        diesel: 0.24,
        hybrid: 0.12,
        electric: 0.05
      },
      flight: 90, // kg CO2e per hour
      bus: 0.08 // kg CO2e per km
    },
    lifestyle: {
      diet: {
        vegetarian: 1.5, // tons CO2e per year
        mixed: 2.5,
        meatHeavy: 3.5
      },
      shopping: {
        low: 0.5,
        moderate: 1.0,
        high: 2.0
      },
      waste: {
        low: 0.3,
        average: 0.6,
        high: 1.0
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateFootprint = () => {
    setLoading(true);
    
    // Simulate calculation
    setTimeout(() => {
      let total = 0;
      let breakdown = {};

      // Electricity calculation
      if (formData.electricity) {
        const electricityEmissions = formData.electricity * emissionFactors.electricity[formData.electricitySource];
        breakdown.electricity = electricityEmissions;
        total += electricityEmissions;
      }

      // Transportation calculations
      if (formData.carDistance) {
        const carEmissions = formData.carDistance * emissionFactors.transportation.car[formData.carType];
        breakdown.car = carEmissions;
        total += carEmissions;
      }

      if (formData.flightHours) {
        const flightEmissions = formData.flightHours * emissionFactors.transportation.flight;
        breakdown.flights = flightEmissions;
        total += flightEmissions;
      }

      if (formData.busDistance) {
        const busEmissions = formData.busDistance * emissionFactors.transportation.bus;
        breakdown.bus = busEmissions;
        total += busEmissions;
      }

      // Lifestyle (annual estimates)
      breakdown.diet = emissionFactors.lifestyle.diet[formData.diet] * 1000; // Convert to kg
      breakdown.shopping = emissionFactors.lifestyle.shopping[formData.shopping] * 1000;
      breakdown.waste = emissionFactors.lifestyle.waste[formData.waste] * 1000;

      total += breakdown.diet + breakdown.shopping + breakdown.waste;

      // Convert to tons
      const totalTons = total / 1000;

      setResults({
        total: totalTons,
        breakdown,
        comparison: {
          africanAverage: 1.8,
          globalAverage: 4.8,
          sustainableTarget: 2.0
        }
      });
      setLoading(false);
    }, 1500);
  };

  const getRecommendations = () => {
    if (!results) return [];
    
    const recs = [];
    const { breakdown } = results;

    if (breakdown.electricity > 1000) {
      recs.push({
        icon: '💡',
        title: 'Switch to Renewable Energy',
        description: 'Consider solar panels or choose a green energy provider',
        impact: 'High impact',
        savings: 'Up to 80% reduction'
      });
    }

    if (breakdown.car > 500) {
      recs.push({
        icon: '🚗',
        title: 'Reduce Car Usage',
        description: 'Use public transport, carpool, or switch to an electric vehicle',
        impact: 'Medium impact',
        savings: 'Up to 50% reduction'
      });
    }

    if (breakdown.diet > 2500) {
      recs.push({
        icon: '🥦',
        title: 'Adjust Your Diet',
        description: 'Reduce meat consumption and choose local, seasonal foods',
        impact: 'High impact',
        savings: 'Up to 30% reduction'
      });
    }

    if (breakdown.flights > 1000) {
      recs.push({
        icon: '✈️',
        title: 'Reduce Air Travel',
        description: 'Consider video conferencing or train travel for shorter distances',
        impact: 'Very high impact',
        savings: 'Up to 90% reduction per trip'
      });
    }

    return recs;
  };

  return (
    <div className="carbon-calculator">
      <div className="calculator-header">
        <h1>🌱 Carbon Footprint Calculator</h1>
        <p>Calculate your personal or organizational carbon emissions with African-specific data</p>
      </div>

      <div className="calculator-layout">
        {/* Input Form */}
        <div className="calculator-form">
          <div className="form-section">
            <h3>🏠 Energy Consumption</h3>
            <div className="form-group">
              <label>Monthly Electricity Usage (kWh)</label>
              <input
                type="number"
                name="electricity"
                value={formData.electricity}
                onChange={handleChange}
                placeholder="e.g., 300"
              />
            </div>
            <div className="form-group">
              <label>Primary Energy Source</label>
              <select
                name="electricitySource"
                value={formData.electricitySource}
                onChange={handleChange}
              >
                <option value="grid">Grid Electricity</option>
                <option value="solar">Solar Power</option>
                <option value="hydro">Hydroelectric</option>
                <option value="wind">Wind Power</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>🚗 Transportation</h3>
            <div className="form-group">
              <label>Weekly Car Distance (km)</label>
              <input
                type="number"
                name="carDistance"
                value={formData.carDistance}
                onChange={handleChange}
                placeholder="e.g., 200"
              />
            </div>
            <div className="form-group">
              <label>Car Type</label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>
            </div>
            <div className="form-group">
              <label>Annual Flight Hours</label>
              <input
                type="number"
                name="flightHours"
                value={formData.flightHours}
                onChange={handleChange}
                placeholder="e.g., 10"
              />
            </div>
            <div className="form-group">
              <label>Weekly Bus/Train Distance (km)</label>
              <input
                type="number"
                name="busDistance"
                value={formData.busDistance}
                onChange={handleChange}
                placeholder="e.g., 50"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>🌍 Lifestyle</h3>
            <div className="form-group">
              <label>Diet Type</label>
              <select
                name="diet"
                value={formData.diet}
                onChange={handleChange}
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="mixed">Mixed</option>
                <option value="meatHeavy">Meat-Heavy</option>
              </select>
            </div>
            <div className="form-group">
              <label>Shopping Habits</label>
              <select
                name="shopping"
                value={formData.shopping}
                onChange={handleChange}
              >
                <option value="low">Minimal</option>
                <option value="moderate">Moderate</option>
                <option value="high">Frequent</option>
              </select>
            </div>
            <div className="form-group">
              <label>Waste Production</label>
              <select
                name="waste"
                value={formData.waste}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="average">Average</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <button 
            className="calculate-btn"
            onClick={calculateFootprint}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Calculating...
              </>
            ) : (
              'Calculate My Footprint'
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className="results-panel">
          {results ? (
            <div className="results-content">
              <div className="total-emissions">
                <h2>Your Carbon Footprint</h2>
                <div className="emission-number">
                  {results.total.toFixed(1)} <span>tons CO₂e/year</span>
                </div>
                
                <div className="comparison-chart">
                  <div className="comparison-item">
                    <label>Your Footprint</label>
                    <div className="bar-container">
                      <div 
                        className="bar your-footprint" 
                        style={{width: `${(results.total / 6) * 100}%`}}
                      ></div>
                    </div>
                    <span>{results.total.toFixed(1)}t</span>
                  </div>
                  
                  <div className="comparison-item">
                    <label>African Average</label>
                    <div className="bar-container">
                      <div 
                        className="bar african-average" 
                        style={{width: `${(results.comparison.africanAverage / 6) * 100}%`}}
                      ></div>
                    </div>
                    <span>{results.comparison.africanAverage}t</span>
                  </div>
                  
                  <div className="comparison-item">
                    <label>Global Average</label>
                    <div className="bar-container">
                      <div 
                        className="bar global-average" 
                        style={{width: `${(results.comparison.globalAverage / 6) * 100}%`}}
                      ></div>
                    </div>
                    <span>{results.comparison.globalAverage}t</span>
                  </div>
                  
                  <div className="comparison-item">
                    <label>Sustainable Target</label>
                    <div className="bar-container">
                      <div 
                        className="bar sustainable-target" 
                        style={{width: `${(results.comparison.sustainableTarget / 6) * 100}%`}}
                      ></div>
                    </div>
                    <span>{results.comparison.sustainableTarget}t</span>
                  </div>
                </div>
              </div>

              <div className="breakdown-section">
                <h3>Emissions Breakdown</h3>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <span className="category">⚡ Energy</span>
                    <span className="value">{(results.breakdown.electricity / 1000).toFixed(1)}t</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="category">🚗 Transport</span>
                    <span className="value">{((results.breakdown.car || 0) / 1000).toFixed(1)}t</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="category">✈️ Flights</span>
                    <span className="value">{((results.breakdown.flights || 0) / 1000).toFixed(1)}t</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="category">🍽️ Diet</span>
                    <span className="value">{(results.breakdown.diet / 1000).toFixed(1)}t</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="category">🛍️ Shopping</span>
                    <span className="value">{(results.breakdown.shopping / 1000).toFixed(1)}t</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="category">🗑️ Waste</span>
                    <span className="value">{(results.breakdown.waste / 1000).toFixed(1)}t</span>
                  </div>
                </div>
              </div>

              <div className="recommendations-section">
                <h3>Reduction Recommendations</h3>
                <div className="recommendations-grid">
                  {getRecommendations().map((rec, index) => (
                    <div key={index} className="recommendation-card">
                      <div className="rec-icon">{rec.icon}</div>
                      <div className="rec-content">
                        <h4>{rec.title}</h4>
                        <p>{rec.description}</p>
                        <div className="rec-meta">
                          <span className="impact">{rec.impact}</span>
                          <span className="savings">{rec.savings}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button className="save-btn">💾 Save Results</button>
                <button className="share-btn">📤 Share Report</button>
                <button className="reset-btn" onClick={() => setResults(null)}>
                  🔄 Calculate Again
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-results">
              <div className="empty-icon">🌍</div>
              <h3>Calculate Your Impact</h3>
              <p>Fill in your information to see your carbon footprint and get personalized recommendations for reduction.</p>
              <div className="info-tips">
                <div className="tip">
                  <strong>African Context:</strong> Uses region-specific emission factors
                </div>
                <div className="tip">
                  <strong>Practical Tips:</strong> Actionable recommendations for your lifestyle
                </div>
                <div className="tip">
                  <strong>Progress Tracking:</strong> Save and compare your results over time
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;