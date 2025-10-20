import React, { useState } from 'react';
import './Tools.css';

const Converter = () => {
  const [conversionType, setConversionType] = useState('energy');
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState({});

  const conversionFactors = {
    energy: {
      kwh_to_co2: 0.5, // kg CO2 per kWh
      kwh_to_trees: 0.02, // trees needed to offset per kWh
      kwh_to_solar: 0.00025 // solar panel hours per kWh
    },
    waste: {
      kg_to_co2: 0.5, // kg CO2 per kg waste
      kg_to_landfill: 1.2, // landfill space in liters
      kg_to_compost: 0.8 // compost potential ratio
    },
    water: {
      liter_to_co2: 0.0003, // kg CO2 per liter
      liter_to_energy: 0.005, // kWh to treat per liter
      liter_to_rainwater: 0.7 // rainwater equivalent ratio
    },
    transportation: {
      km_to_co2: 0.2, // kg CO2 per km
      km_to_trees: 0.01, // trees to offset per km
      km_to_public_transport: 0.3 // public transport equivalent
    }
  };

  const conversionLabels = {
    energy: {
      input: 'Energy (kWh)',
      outputs: [
        { label: 'CO₂ Emissions', unit: 'kg CO₂', key: 'kwh_to_co2' },
        { label: 'Trees to Offset', unit: 'trees', key: 'kwh_to_trees' },
        { label: 'Solar Panel Hours', unit: 'hours', key: 'kwh_to_solar' }
      ]
    },
    waste: {
      input: 'Waste (kg)',
      outputs: [
        { label: 'CO₂ Emissions', unit: 'kg CO₂', key: 'kg_to_co2' },
        { label: 'Landfill Space', unit: 'liters', key: 'kg_to_landfill' },
        { label: 'Compost Potential', unit: 'kg compost', key: 'kg_to_compost' }
      ]
    },
    water: {
      input: 'Water (liters)',
      outputs: [
        { label: 'CO₂ from Treatment', unit: 'kg CO₂', key: 'liter_to_co2' },
        { label: 'Treatment Energy', unit: 'kWh', key: 'liter_to_energy' },
        { label: 'Rainwater Equivalent', unit: 'liters', key: 'liter_to_rainwater' }
      ]
    },
    transportation: {
      input: 'Distance (km)',
      outputs: [
        { label: 'CO₂ Emissions', unit: 'kg CO₂', key: 'km_to_co2' },
        { label: 'Trees to Offset', unit: 'trees', key: 'km_to_trees' },
        { label: 'Public Transport Eq.', unit: 'km', key: 'km_to_public_transport' }
      ]
    }
  };

  const calculateConversions = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    const factors = conversionFactors[conversionType];
    const labels = conversionLabels[conversionType];
    const newResults = {};

    labels.outputs.forEach(output => {
      newResults[output.label] = (value * factors[output.key]).toFixed(4);
    });

    setResults(newResults);
  };

  const resetConverter = () => {
    setInputValue('');
    setResults({});
  };

  return (
    <div className="tools-container">
      <div className="tools-header">
        <h2>🔄 Environmental Converter</h2>
        <p>Convert between different environmental metrics and understand impacts</p>
      </div>

      <div className="converter-content">
        <div className="converter-controls">
          <div className="type-selector">
            <label>Conversion Type:</label>
            <select 
              value={conversionType} 
              onChange={(e) => setConversionType(e.target.value)}
            >
              <option value="energy">Energy</option>
              <option value="waste">Waste</option>
              <option value="water">Water</option>
              <option value="transportation">Transportation</option>
            </select>
          </div>

          <div className="input-container">
            <label>{conversionLabels[conversionType].input}:</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>

          <div className="button-group">
            <button onClick={calculateConversions} className="calculate-btn">
              Convert
            </button>
            <button onClick={resetConverter} className="reset-btn">
              Reset
            </button>
          </div>
        </div>

        {Object.keys(results).length > 0 && (
          <div className="conversion-results">
            <h3>Conversion Results</h3>
            <div className="results-grid">
              {conversionLabels[conversionType].outputs.map((output, index) => (
                <div key={index} className="conversion-card">
                  <h4>{output.label}</h4>
                  <div className="conversion-value">
                    {results[output.label]} {output.unit}
                  </div>
                  <p>Based on {inputValue} {conversionLabels[conversionType].input.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="conversion-info">
          <h4>ℹ️ About These Conversions</h4>
          <p>
            These conversions use industry-standard environmental impact factors. 
            Actual impacts may vary based on local conditions, technologies, and specific circumstances.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Converter;