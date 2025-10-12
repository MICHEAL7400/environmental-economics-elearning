import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CarbonCalculator from './Tools/CarbonCalculator';
import ROICalculator from './Tools/ROICalculator';
import './Tools.css';

const Tools = () => {
  const [activeTool, setActiveTool] = useState('carbon');

  const tools = [
    {
      id: 'carbon',
      name: 'Carbon Footprint Calculator',
      icon: '🌱',
      description: 'Calculate personal or organizational carbon emissions',
      component: <CarbonCalculator />
    },
    {
      id: 'roi',
      name: 'Green Investment ROI Calculator',
      icon: '💰',
      description: 'Analyze financial returns on environmental projects',
      component: <ROICalculator />
    },
    {
      id: 'cba',
      name: 'Cost-Benefit Analysis Tool',
      icon: '📊',
      description: 'Evaluate economic viability of environmental policies',
      component: <div className="coming-soon">Cost-Benefit Analysis Tool - Coming Soon! 🚀</div>
    },
    {
      id: 'policy',
      name: 'Policy Impact Simulator',
      icon: '⚖️',
      description: 'Simulate economic impacts of environmental policies',
      component: <div className="coming-soon">Policy Impact Simulator - Coming Soon! 🚀</div>
    }
  ];

  const activeToolData = tools.find(tool => tool.id === activeTool);

  return (
    <div className="tools-page">
      <div className="container">
        <div className="page-header">
          <h1>🛠️ Practical Tools & Calculators</h1>
          <p>Interactive tools to apply environmental economics in real-world African contexts</p>
        </div>

        {/* Tool Selection */}
        <div className="tools-selection">
          <div className="tools-grid">
            {tools.map(tool => (
              <div
                key={tool.id}
                className={`tool-card ${activeTool === tool.id ? 'active' : ''}`}
                onClick={() => setActiveTool(tool.id)}
              >
                <div className="tool-icon">{tool.icon}</div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <div className="tool-features">
                  <span>🌍 African Context</span>
                  <span>📈 Custom Scenarios</span>
                  <span>📋 Action Plans</span>
                </div>
                <button className="tool-button">
                  {activeTool === tool.id ? 'Using Tool →' : 'Select Tool →'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Tool Display */}
        <div className="active-tool-container">
          {activeToolData.component}
        </div>

        {/* Additional Resources */}
        <div className="tools-resources">
          <h2>📚 Learning Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>How to Use These Tools</h3>
              <p>Guide to interpreting results and making data-driven decisions</p>
              <Link to="/guides/tools" className="resource-link">Read Guide →</Link>
            </div>
            <div className="resource-card">
              <h3>African Case Studies</h3>
              <p>Real examples of environmental economics in action across Africa</p>
              <Link to="/case-studies" className="resource-link">View Cases →</Link>
            </div>
            <div className="resource-card">
              <h3>Data Sources</h3>
              <p>African environmental and economic data references</p>
              <Link to="/data-sources" className="resource-link">Explore Data →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;