// client/src/components/CaseStudies.js
import React, { useState } from 'react';

const CaseStudies = () => {
  const [filter, setFilter] = useState('all');
  
  const caseStudies = [
    {
      id: 1,
      title: 'Kafue River Mining Disaster: Economic Impact Assessment',
      country: 'Zambia',
      sector: 'Mining',
      year: 2025,
      image: '⚠️',
      summary: 'Comprehensive analysis of the Sino-Metals dam collapse economic consequences on communities, agriculture, and public health.',
      keyMetrics: {
        totalCost: '$285M',
        jobsAffected: '25,000',
        recoveryTime: '15 years',
        policyChanges: '12 reforms'
      },
      tags: ['mining', 'water-pollution', 'disaster', 'zambia']
    },
    {
      id: 2,
      title: 'Rwanda Green City Kigali: Economic Analysis',
      country: 'Rwanda', 
      sector: 'Urban Development',
      year: 2024,
      image: '🏙️',
      summary: 'Economic assessment of Africa\'s first green city master plan and its sustainable development impacts.',
      keyMetrics: {
        investment: '$1.2B',
        jobsCreated: '15,000',
        emissionsReduction: '60%',
        costSavings: '30%'
      },
      tags: ['urban', 'green-infrastructure', 'rwanda', 'innovation']
    },
    {
      id: 3,
      title: 'Kenya Solar Revolution: Energy Economics',
      country: 'Kenya',
      sector: 'Energy',
      year: 2024,
      image: '☀️',
      summary: 'Analysis of Kenya\'s rapid solar energy adoption and its economic impacts on energy access and costs.',
      keyMetrics: {
        capacityAdded: '800MW',
        costReduction: '45%',
        jobsCreated: '8,500',
        householdsServed: '2.1M'
      },
      tags: ['solar', 'renewable', 'kenya', 'energy-access']
    }
  ];

  const filteredStudies = filter === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.tags.includes(filter));

  return (
    <div className="case-studies">
      <div className="container">
        <div className="page-header">
          <h1>📚 African Environmental Case Studies</h1>
          <p>Real-world examples of environmental economics in action across Africa</p>
        </div>

        <div className="filter-buttons">
          {['all', 'mining', 'energy', 'urban', 'agriculture', 'water'].map(tag => (
            <button
              key={tag}
              className={`filter-btn ${filter === tag ? 'active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {tag === 'all' ? 'All Cases' : tag}
            </button>
          ))}
        </div>

        <div className="case-studies-grid">
          {filteredStudies.map(study => (
            <div key={study.id} className="case-study-card">
              <div className="case-header">
                <span className="case-image">{study.image}</span>
                <div className="case-meta">
                  <span className="country-flag">{study.country}</span>
                  <span className="sector-tag">{study.sector}</span>
                  <span className="year">{study.year}</span>
                </div>
              </div>
              
              <h3>{study.title}</h3>
              <p>{study.summary}</p>
              
              <div className="metrics-grid">
                {Object.entries(study.keyMetrics).map(([key, value]) => (
                  <div key={key} className="metric">
                    <div className="metric-value">{value}</div>
                    <div className="metric-label">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>
              
              <div className="case-actions">
                <button className="read-more">Read Full Case Study →</button>
                <button className="download">📥 Download Data</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;