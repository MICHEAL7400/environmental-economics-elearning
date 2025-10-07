// server/index.js - MEGA EXPANSION
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MEGA COURSE CATALOG
app.get('/api/courses', (req, res) => {
  const courses = [
    // ... previous courses PLUS NEW ONES ...
    {
      id: 7,
      title: 'Climate Finance and Green Investment',
      description: 'Master climate finance mechanisms, green bonds, and investment strategies for sustainable development in African markets.',
      duration: '70 min',
      level: 'Advanced',
      category: 'finance',
      students: 420,
      rating: 4.7,
      modules: 5,
      instructor: 'Dr. Finance Green',
      image: '💹',
      learningObjectives: [
        'Analyze climate finance instruments and markets',
        'Evaluate green investment opportunities in Africa',
        'Understand carbon credit trading mechanisms',
        'Design sustainable investment portfolios'
      ],
      syllabus: [
        'Introduction to Climate Finance',
        'Green Bonds and Sustainable Investing',
        'Carbon Markets and Trading',
        'African Climate Fund Opportunities',
        'Case Study: Nigeria Green Bonds'
      ]
    },
    {
      id: 8,
      title: 'Circular Economy and Waste Management Economics',
      description: 'Explore the economic principles behind circular economy models and sustainable waste management systems in urban Africa.',
      duration: '55 min',
      level: 'Intermediate',
      category: 'circular-economy',
      students: 380,
      rating: 4.5,
      modules: 4,
      instructor: 'Prof. Cycle Waste',
      image: '🔄',
      learningObjectives: [
        'Understand circular economy business models',
        'Analyze waste-to-energy economic viability',
        'Evaluate recycling market dynamics',
        'Design sustainable urban waste systems'
      ],
      syllabus: [
        'Circular Economy Fundamentals',
        'Waste Management Economics',
        'Recycling Market Analysis',
        'Urban Sustainability Case Studies'
      ]
    },
    {
      id: 9,
      title: 'Biodiversity and Ecosystem Services Valuation',
      description: 'Learn how to economically value biodiversity, ecosystem services, and natural capital for better conservation decisions.',
      duration: '65 min',
      level: 'Advanced',
      category: 'biodiversity',
      students: 290,
      rating: 4.8,
      modules: 5,
      instructor: 'Dr. Bio Diversity',
      image: '🦁',
      learningObjectives: [
        'Value ecosystem services economically',
        'Analyze conservation cost-benefit ratios',
        'Understand payment for ecosystem services',
        'Design biodiversity offset mechanisms'
      ],
      syllabus: [
        'Ecosystem Services Valuation Methods',
        'Conservation Economics',
        'Payment for Ecosystem Services (PES)',
        'Biodiversity Offsets',
        'Case Study: Congo Basin Forests'
      ]
    },
    {
      id: 10,
      title: 'Environmental Justice and Equity Economics',
      description: 'Examine the economic dimensions of environmental justice, equity, and inclusive green growth in African contexts.',
      duration: '60 min',
      level: 'Intermediate',
      category: 'justice',
      students: 510,
      rating: 4.6,
      modules: 4,
      instructor: 'Prof. Justice Equal',
      image: '⚖️',
      learningObjectives: [
        'Analyze environmental inequality economics',
        'Evaluate just transition frameworks',
        'Understand green job creation economics',
        'Design inclusive climate policies'
      ],
      syllabus: [
        'Environmental Justice Economics',
        'Just Transition Frameworks',
        'Green Job Creation',
        'Inclusive Policy Design'
      ]
    }
  ];
  res.json(courses);
});

// DEEP DIVE MODULES WITH RICH CONTENT
app.get('/api/courses/:id/modules', (req, res) => {
  const allModules = {
    7: [
      {
        id: 1,
        title: 'Climate Finance Instruments and Mechanisms',
        content: `
          <h3>Understanding Climate Finance Landscape</h3>
          <p>Climate finance refers to local, national, or transnational financing—drawn from public, private and alternative sources of financing—that seeks to support mitigation and adaptation actions that will address climate change.</p>
          
          <h4>Key Climate Finance Instruments:</h4>
          <div class="finance-grid">
            <div class="instrument-card">
              <h5>🌱 Green Bonds</h5>
              <p><strong>Definition:</strong> Fixed-income instruments specifically earmarked to raise money for climate and environmental projects.</p>
              <p><strong>African Example:</strong> Nigeria's $1.2 billion sovereign green bond (2023) funding renewable energy and afforestation.</p>
              <p><strong>Market Size:</strong> Global green bond market reached $2.5 trillion in 2024, with Africa representing 3% share.</p>
            </div>
            
            <div class="instrument-card">
              <h5>💸 Climate Funds</h5>
              <p><strong>Definition:</strong> Dedicated funding mechanisms for climate action, often managed by multilateral institutions.</p>
              <p><strong>African Example:</strong> Green Climate Fund allocating $850 million to African renewable energy projects (2024-2026).</p>
              <p><strong>Key Funds:</strong> GCF, Adaptation Fund, Climate Investment Funds</p>
            </div>
            
            <div class="instrument-card">
              <h5>📊 Carbon Markets</h5>
              <p><strong>Definition:</strong> Trading systems where carbon credits are sold and bought to offset emissions.</p>
              <p><strong>African Example:</strong> East African Carbon Exchange facilitating $45 million in trades annually.</p>
              <p><strong>Growth:</strong> African carbon market projected to reach $5 billion by 2030.</p>
            </div>
          </div>

          <h4>African Climate Finance Flows (2024):</h4>
          <table class="data-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Amount (USD)</th>
                <th>Primary Sectors</th>
                <th>Growth Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Multilateral Funds</td>
                <td>$4.2 billion</td>
                <td>Renewable Energy, Adaptation</td>
                <td>+15% annually</td>
              </tr>
              <tr>
                <td>Private Investment</td>
                <td>$8.7 billion</td>
                <td>Solar, Wind, Green Infrastructure</td>
                <td>+22% annually</td>
              </tr>
              <tr>
                <td>Domestic Budgets</td>
                <td>$12.5 billion</td>
                <td>Agriculture, Water, Energy</td>
                <td>+8% annually</td>
              </tr>
              <tr>
                <td>Philanthropic</td>
                <td>$850 million</td>
                <td>Conservation, Resilience</td>
                <td>+18% annually</td>
              </tr>
            </tbody>
          </table>

          <h4>Case Study: Zambia Climate Finance Readiness</h4>
          <p>Zambia has developed a comprehensive climate finance strategy focusing on:</p>
          <ul>
            <li><strong>National Climate Fund:</strong> Established with $50 million seed funding</li>
            <li><strong>Green Bond Framework:</strong> Developed in partnership with IFC</li>
            <li><strong>Carbon Market Strategy:</strong> Targeting REDD+ and renewable energy credits</li>
            <li><strong>Private Sector Mobilization:</strong> Tax incentives for green investments</li>
          </ul>
          
          <div class="interactive-element">
            <h5>📈 Investment Opportunity Calculator</h5>
            <p>Calculate potential returns on solar energy investments in Zambia:</p>
            <div class="calculator">
              <label>Investment Amount (USD):</label>
              <input type="number" id="investmentAmount" placeholder="e.g., 100000">
              <label>Project Location:</label>
              <select id="projectLocation">
                <option value="lusaka">Lusaka</option>
                <option value="copperbelt">Copperbelt</option>
                <option value="southern">Southern Province</option>
              </select>
              <button onclick="calculateROI()">Calculate ROI</button>
              <div id="roiResult"></div>
            </div>
          </div>
        `,
        duration: '25 min',
        interactive: true,
        resources: [
          { type: 'pdf', title: 'African Climate Finance Report 2024', url: '#' },
          { type: 'tool', title: 'Climate Investment Calculator', url: '#' },
          { type: 'dataset', title: 'African Green Bond Database', url: '#' }
        ]
      }
    ],
    8: [
      {
        id: 1,
        title: 'Circular Economy Business Models',
        content: `
          <h3>Transforming Waste into Wealth</h3>
          <p>The circular economy represents a $4.5 trillion opportunity globally by 2030. In Africa, innovative business models are turning waste challenges into economic opportunities.</p>
          
          <h4>African Circular Economy Success Stories:</h4>
          <div class="case-study-grid">
            <div class="success-story">
              <h5>🇳🇬 Wecyclers (Nigeria)</h5>
              <p><strong>Model:</strong> Incentive-based waste collection using mobile technology</p>
              <p><strong>Impact:</strong> Collected 3,000+ tons of recyclables, created 500+ jobs</p>
              <p><strong>Economics:</strong> $2.1 million revenue, 35% profit margin</p>
            </div>
            
            <div class="success-story">
              <h5>🇰🇪 Sanergy (Kenya)</h5>
              <p><strong>Model:</strong> Container-based sanitation with waste-to-fertilizer conversion</p>
              <p><strong>Impact:</strong> Serves 140,000+ urban residents daily</p>
              <p><strong>Economics:</strong> $4.8 million annual revenue, 100,000+ tons organic fertilizer produced</p>
            </div>
            
            <div class="success-story">
              <h5>🇿🇲 Zambian Waste Plastic Initiative</h5>
              <p><strong>Model:</strong> Community-based plastic collection and recycling</p>
              <p><strong>Impact:</strong> 200+ collection points, 5,000+ households engaged</p>
              <p><strong>Economics:</strong> $450,000 annual turnover, 120 direct jobs created</p>
            </div>
          </div>

          <h4>Circular Economy Value Chain Analysis:</h4>
          <div class="value-chain">
            <div class="chain-step">
              <h6>1. Collection & Sorting</h6>
              <p><strong>Economic Value:</strong> $50-150/ton</p>
              <p><strong>Employment:</strong> 10-50 jobs per 10,000 population</p>
              <p><strong>Technology:</strong> Smart bins, mobile apps, sorting facilities</p>
            </div>
            <div class="chain-step">
              <h6>2. Processing & Manufacturing</h6>
              <p><strong>Economic Value:</strong> $200-800/ton</p>
              <p><strong>Employment:</strong> 5-20 jobs per facility</p>
              <p><strong>Technology:</strong> Recycling machinery, 3D printing, composting</p>
            </div>
            <div class="chain-step">
              <h6>3. Market & Distribution</h6>
              <p><strong>Economic Value:</strong> $100-500/ton</p>
              <p><strong>Employment:</strong> 3-15 jobs per distribution network</p>
              <p><strong>Technology:</strong> E-commerce platforms, logistics networks</p>
            </div>
          </div>

          <h4>Waste-to-Energy Economic Analysis:</h4>
          <table class="data-table">
            <thead>
              <tr>
                <th>Technology</th>
                <th>Capital Cost (USD/kW)</th>
                <th>Operating Cost (USD/MWh)</th>
                <th>Revenue Potential (USD/MWh)</th>
                <th>Payback Period</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Incineration</td>
                <td>$3,500-5,000</td>
                <td>$45-65</td>
                <td>$80-120</td>
                <td>8-12 years</td>
              </tr>
              <tr>
                <td>Anaerobic Digestion</td>
                <td>$2,000-3,500</td>
                <td>$30-50</td>
                <td>$70-100</td>
                <td>6-9 years</td>
              </tr>
              <tr>
                <td>Gasification</td>
                <td>$4,000-6,000</td>
                <td>$50-75</td>
                <td>$90-140</td>
                <td>10-15 years</td>
              </tr>
              <tr>
                <td>Landfill Gas</td>
                <td>$1,500-2,500</td>
                <td>$20-35</td>
                <td>$50-80</td>
                <td>4-7 years</td>
              </tr>
            </tbody>
          </table>

          <div class="business-plan-template">
            <h5>📊 Circular Economy Business Plan Template</h5>
            <p>Download our comprehensive template for developing circular economy ventures:</p>
            <ul>
              <li>Market analysis and opportunity assessment</li>
              <li>Financial projections and revenue models</li>
              <li>Regulatory compliance checklist</li>
              <li>Impact measurement framework</li>
              <li>Funding and investment strategy</li>
            </ul>
            <button class="download-btn">📥 Download Business Plan Template</button>
          </div>
        `,
        duration: '30 min',
        caseStudy: true,
        resources: [
          { type: 'template', title: 'Circular Business Model Canvas', url: '#' },
          { type: 'dataset', title: 'African Waste Management Costs Database', url: '#' },
          { type: 'guide', title: 'Waste-to-Energy Feasibility Guide', url: '#' }
        ]
      }
    ]
  };
  
  res.json(allModules[req.params.id] || []);
});

// NEW: PRACTICAL TOOLS AND CALCULATORS
app.get('/api/tools', (req, res) => {
  const tools = [
    {
      id: 1,
      name: 'Carbon Footprint Calculator',
      description: 'Calculate organizational or personal carbon emissions with African-specific factors',
      category: 'calculator',
      url: '/tools/carbon-calculator',
      icon: '📊'
    },
    {
      id: 2,
      name: 'Environmental Cost-Benefit Analysis Tool',
      description: 'Analyze economic viability of environmental projects with built-in African context',
      category: 'analysis',
      url: '/tools/cba-tool',
      icon: '💰'
    },
    {
      id: 3,
      name: 'Green Investment ROI Calculator',
      description: 'Calculate returns on renewable energy, conservation, and sustainability investments',
      category: 'finance',
      url: '/tools/roi-calculator',
      icon: '📈'
    },
    {
      id: 4,
      name: 'Policy Impact Simulator',
      description: 'Simulate economic impacts of environmental policies in African contexts',
      category: 'policy',
      url: '/tools/policy-simulator',
      icon: '⚖️'
    }
  ];
  res.json(tools);
});

// NEW: CASE STUDY LIBRARY
app.get('/api/case-studies', (req, res) => {
  const caseStudies = [
    {
      id: 1,
      title: 'Kafue River Pollution: Economic Impact Assessment',
      country: 'Zambia',
      sector: 'Mining',
      year: 2025,
      summary: 'Comprehensive analysis of the Sino-Metals dam collapse economic consequences',
      keyFindings: [
        'Total economic cost: $285 million',
        '25,000 jobs directly affected',
        '15-year recovery timeline',
        'Policy reforms implemented'
      ],
      lessons: [
        'Need for stronger environmental bonds',
        'Importance of independent monitoring',
        'Community engagement protocols',
        'Emergency response planning'
      ],
      resources: ['Full report', 'Economic data', 'Policy recommendations']
    },
    {
      id: 2,
      title: 'Rwanda Green City Master Plan',
      country: 'Rwanda',
      sector: 'Urban Development',
      year: 2024,
      summary: 'Economic analysis of Africa\'s first green city development',
      keyFindings: [
        '30% cost savings through green design',
        '15,000 green jobs created',
        '60% reduction in carbon emissions',
        '5-year ROI on green infrastructure'
      ],
      lessons: [
        'Integrated planning approach',
        'Public-private partnership models',
        'Community co-design benefits',
        'Scalable green urban solutions'
      ],
      resources: ['Master plan', 'Economic model', 'Implementation guide']
    }
  ];
  res.json(caseStudies);
});

// NEW: POLICY DATABASE
app.get('/api/policies', (req, res) => {
  const policies = [
    {
      id: 1,
      name: 'Zambia Environmental Management Act 2024',
      country: 'Zambia',
      type: 'Legislation',
      status: 'Active',
      summary: 'Comprehensive environmental protection and management framework',
      keyProvisions: [
        'Environmental impact assessment requirements',
        'Pollution control standards',
        'Natural resource management',
        'Climate change adaptation'
      ],
      economicInstruments: [
        'Environmental taxes',
        'Trading schemes',
        'Subsidies for green tech',
        'Performance bonds'
      ]
    },
    {
      id: 2,
      name: 'Kenya Climate Change Act 2023',
      country: 'Kenya',
      type: 'Legislation',
      status: 'Active',
      summary: 'Framework for climate change response and low-carbon development',
      keyProvisions: [
        'Carbon budgeting system',
        'Climate finance mechanisms',
        'Sectoral emission targets',
        'Adaptation planning'
      ],
      economicInstruments: [
        'Carbon tax',
        'Green bonds framework',
        'Renewable energy incentives',
        'Climate risk disclosure'
      ]
    }
  ];
  res.json(policies);
});

// NEW: DATA AND STATISTICS
app.get('/api/statistics', (req, res) => {
  const stats = {
    environmentalEconomics: {
      africaGreenGrowth: {
        title: 'Green Growth Indicators - Africa',
        data: {
          renewableEnergyInvestment: { value: 28.5, unit: 'billion USD', growth: '+18%' },
          greenJobs: { value: 2.3, unit: 'million', growth: '+12%' },
          carbonMarketValue: { value: 4.2, unit: 'billion USD', growth: '+25%' },
          sustainableAgriculture: { value: 15.7, unit: 'billion USD investment', growth: '+8%' }
        }
      },
      zambiaEnvironmental: {
        title: 'Zambia Environmental Economics 2024',
        data: {
          miningEnvironmentalCosts: { value: 450, unit: 'million USD annually' },
          renewableEnergyPotential: { value: 6000, unit: 'MW untapped' },
          forestConservationValue: { value: 1.2, unit: 'billion USD ecosystem services' },
          climateFinanceFlows: { value: 125, unit: 'million USD annually' }
        }
      }
    }
  };
  res.json(stats);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});