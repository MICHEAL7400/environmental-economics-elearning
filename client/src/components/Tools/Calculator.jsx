import React, { useState } from 'react';
import './Tools.css';

const Calculator = () => {
  const [inputs, setInputs] = useState({
    energyUsage: '',
    wasteProduction: '',
    waterConsumption: '',
    transportation: ''
  });
  const [results, setResults] = useState(null);

  const calculateFootprint = () => {
    const energy = parseFloat(inputs.energyUsage) || 0;
    const waste = parseFloat(inputs.wasteProduction) || 0;
    const water = parseFloat(inputs.waterConsumption) || 0;
    const transport = parseFloat(inputs.transportation) || 0;

    // Simplified calculation (replace with actual formulas)
    const carbonFootprint = (energy * 0.5) + (waste * 0.2) + (water * 0.1) + (transport * 0.2);
    const sustainabilityScore = Math.max(0, 100 - carbonFootprint);
    
    setResults({
      carbonFootprint: carbonFootprint.toFixed(2),
      sustainabilityScore: sustainabilityScore.toFixed(1),
      recommendations: getRecommendations(carbonFootprint)
    });
  };

  const getRecommendations = (footprint) => {
    if (footprint < 10) return ["Great job! You're very environmentally conscious.", "Consider sharing your practices with others."];
    if (footprint < 25) return ["Good progress!", "Try reducing energy consumption further.", "Consider renewable energy sources."];
    return ["Significant room for improvement.", "Focus on reducing waste and energy usage.", "Consider an environmental audit."];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetCalculator = () => {
    setInputs({
      energyUsage: '',
      wasteProduction: '',
      waterConsumption: '',
      transportation: ''
    });
    setResults(null);
  };

  return (
    <div className="tools-container">
      <div className="tools-header">
        <h2>🌱 Environmental Impact Calculator</h2>
        <p>Calculate your carbon footprint and sustainability score</p>
      </div>

      <div className="calculator-grid">
        <div className="input-section">
          <h3>Enter Your Data</h3>
          <div className="input-group">
            <label>Monthly Energy Usage (kWh)</label>
            <input
              type="number"
              name="energyUsage"
              value={inputs.energyUsage}
              onChange={handleInputChange}
              placeholder="e.g., 300"
            />
          </div>
          
          <div className="input-group">
            <label>Weekly Waste Production (kg)</label>
            <input
              type="number"
              name="wasteProduction"
              value={inputs.wasteProduction}
              onChange={handleInputChange}
              placeholder="e.g., 5"
            />
          </div>
          
          <div className="input-group">
            <label>Daily Water Consumption (liters)</label>
            <input
              type="number"
              name="waterConsumption"
              value={inputs.waterConsumption}
              onChange={handleInputChange}
              placeholder="e.g., 150"
            />
          </div>
          
          <div className="input-group">
            <label>Weekly Transportation (km)</label>
            <input
              type="number"
              name="transportation"
              value={inputs.transportation}
              onChange={handleInputChange}
              placeholder="e.g., 100"
            />
          </div>

          <div className="button-group">
            <button onClick={calculateFootprint} className="calculate-btn">
              Calculate Impact
            </button>
            <button onClick={resetCalculator} className="reset-btn">
              Reset
            </button>
          </div>
        </div>

        {results && (
          <div className="results-section">
            <h3>Your Results</h3>
            <div className="result-cards">
              <div className="result-card carbon">
                <h4>Carbon Footprint</h4>
                <div className="result-value">{results.carbonFootprint} CO₂e</div>
                <p>Equivalent carbon dioxide emissions</p>
              </div>
              
              <div className="result-card score">
                <h4>Sustainability Score</h4>
                <div className="result-value">{results.sustainabilityScore}/100</div>
                <p>Your environmental performance</p>
              </div>
            </div>

            <div className="recommendations">
              <h4>💡 Recommendations</h4>
              <ul>
                {results.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;