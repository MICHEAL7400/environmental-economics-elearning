// server/index.js - UPDATED WITH RICH CONTENT
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Extended Course Data with DEEP Content
app.get('/api/courses', (req, res) => {
  const courses = [
    {
      id: 1,
      title: 'Introduction to Environmental Economics',
      description: 'Master the fundamental principles that connect economic activities with environmental sustainability. Understand how market forces, policy interventions, and human behavior impact our natural world.',
      duration: '45 min',
      level: 'Beginner',
      category: 'fundamentals',
      students: 1250,
      rating: 4.8,
      modules: 4,
      instructor: 'Dr. Sarah Chengo',
      image: '🌱',
      learningObjectives: [
        'Define environmental economics and its scope',
        'Understand externalities and market failures',
        'Analyze cost-benefit analysis in environmental context',
        'Evaluate different policy instruments'
      ],
      syllabus: [
        'What is Environmental Economics?',
        'The Tragedy of the Commons',
        'Market Failures and Externalities',
        'Valuing Environmental Resources'
      ]
    },
    {
      id: 2,
      title: 'Carbon Pricing and Emission Trading Systems',
      description: 'Dive deep into carbon markets, tax mechanisms, and trading systems. Learn how countries and corporations are using economic tools to combat climate change effectively.',
      duration: '60 min',
      level: 'Intermediate',
      category: 'policy',
      students: 890,
      rating: 4.6,
      modules: 5,
      instructor: 'Prof. James Mwamba',
      image: '💰',
      learningObjectives: [
        'Compare carbon taxes vs cap-and-trade systems',
        'Analyze economic impacts of carbon pricing',
        'Understand international carbon markets',
        'Evaluate African carbon pricing opportunities'
      ],
      syllabus: [
        'Carbon Tax Fundamentals',
        'Cap-and-Trade Systems',
        'International Carbon Markets',
        'African Carbon Pricing Initiatives',
        'Case Study: South African Carbon Tax'
      ]
    },
    {
      id: 3,
      title: 'Case Study: 2025 Zambia Mining Disaster - Economic Analysis',
      description: 'Comprehensive analysis of the Sino-Metals Leach dam collapse. Explore the economic, social, and environmental costs, and learn how proper economic valuation could have prevented this tragedy.',
      duration: '75 min',
      level: 'Advanced',
      category: 'case-study',
      students: 1560,
      rating: 4.9,
      modules: 6,
      instructor: 'Dr. Lisa Banda',
      image: '⚠️',
      learningObjectives: [
        'Quantify environmental disaster costs',
        'Analyze mining sector externalities',
        'Evaluate corporate accountability mechanisms',
        'Design preventive economic policies'
      ],
      syllabus: [
        'Disaster Timeline and Impact Assessment',
        'Economic Cost Calculation Methods',
        'Health and Social Impact Valuation',
        'Corporate Liability and Compensation',
        'Policy Recommendations',
        'Future Prevention Strategies'
      ]
    },
    {
      id: 4,
      title: 'Renewable Energy Economics in African Context',
      description: 'Explore the economic viability of solar, wind, hydro, and geothermal energy across Africa. Learn about investment models, subsidies, and the true cost of energy transitions.',
      duration: '55 min',
      level: 'Intermediate',
      category: 'energy',
      students: 720,
      rating: 4.7,
      modules: 4,
      instructor: 'Eng. David Okafor',
      image: '⚡',
      learningObjectives: [
        'Calculate Levelized Cost of Energy (LCOE)',
        'Analyze renewable energy investment returns',
        'Understand feed-in tariffs and subsidies',
        'Evaluate grid integration economics'
      ],
      syllabus: [
        'Renewable Energy Cost Structures',
        'Investment and Financing Models',
        'Policy Instruments and Subsidies',
        'Case Study: Kenya Geothermal Success'
      ]
    },
    {
      id: 5,
      title: 'Sustainable Agriculture and Food Security Economics',
      description: 'Understand the economic principles behind sustainable farming, food systems, and climate-resilient agriculture in African contexts.',
      duration: '50 min',
      level: 'Intermediate',
      category: 'agriculture',
      students: 630,
      rating: 4.5,
      modules: 4,
      instructor: 'Dr. Amina Jalloh',
      image: '🌾',
      learningObjectives: [
        'Analyze sustainable farming economics',
        'Understand food security pricing mechanisms',
        'Evaluate climate-smart agriculture benefits',
        'Design agricultural subsidy programs'
      ],
      syllabus: [
        'Economics of Sustainable Farming',
        'Food Security and Pricing',
        'Climate Resilience Investments',
        'Case Study: Malawi Agroecology'
      ]
    },
    {
      id: 6,
      title: 'Water Resource Economics and Management',
      description: 'Learn how economic principles apply to water allocation, pricing, conservation, and infrastructure development in water-stressed regions.',
      duration: '65 min',
      level: 'Advanced',
      category: 'water',
      students: 540,
      rating: 4.6,
      modules: 5,
      instructor: 'Prof. Water San',
      image: '💧',
      learningObjectives: [
        'Apply water pricing mechanisms',
        'Analyze water infrastructure economics',
        'Understand transboundary water conflicts',
        'Evaluate conservation program effectiveness'
      ],
      syllabus: [
        'Water as an Economic Good',
        'Pricing and Allocation Mechanisms',
        'Infrastructure Investment Analysis',
        'Transboundary Water Management',
        'Case Study: Nile River Basin'
      ]
    }
  ];
  res.json(courses);
});

// Detailed Module Content
app.get('/api/courses/:id/modules', (req, res) => {
  const modules = {
    1: [
      {
        id: 1,
        title: 'What is Environmental Economics?',
        content: `
          <h3>Defining Environmental Economics</h3>
          <p>Environmental economics is a sub-field of economics concerned with environmental issues. It focuses on how economic activities affect the environment and how environmental policies can be designed to achieve desirable environmental outcomes efficiently.</p>
          
          <h4>Key Concepts:</h4>
          <ul>
            <li><strong>Sustainable Development:</strong> Meeting present needs without compromising future generations</li>
            <li><strong>Externalities:</strong> Costs or benefits affecting third parties not involved in the transaction</li>
            <li><strong>Market Failure:</strong> When markets don't efficiently allocate resources</li>
            <li><strong>Public Goods:</strong> Goods that are non-excludable and non-rivalrous</li>
          </ul>
          
          <h4>African Context:</h4>
          <p>In Africa, environmental economics is particularly relevant due to our heavy dependence on natural resources. Countries like Zambia face unique challenges balancing economic growth from mining and agriculture with environmental protection.</p>
        `,
        videoUrl: 'https://example.com/videos/env-econ-intro',
        duration: '12 min',
        resources: [
          { type: 'pdf', title: 'Basic Concepts Guide', url: '#' },
          { type: 'article', title: 'African Environmental Challenges', url: '#' }
        ]
      },
      {
        id: 2,
        title: 'The Tragedy of the Commons',
        content: `
          <h3>Understanding Shared Resources</h3>
          <p>The Tragedy of the Commons describes a situation where individuals, acting independently and rationally according to their own self-interest, behave contrary to the best interests of the whole group by depleting some common resource.</p>
          
          <h4>Real-World Examples:</h4>
          <ul>
            <li><strong>Overfishing in Lake Victoria:</strong> Individual fishermen maximizing catch leading to stock depletion</li>
            <li><strong>Deforestation in Congo Basin:</strong> Individual logging interests vs. forest conservation</li>
            <li><strong>Water Resources:</strong> Overuse of shared water sources in drought-prone regions</li>
          </ul>
          
          <h4>Solutions:</h4>
          <ul>
            <li>Government regulation and quotas</li>
            <li>Community-based management systems</li>
            <li>Property rights assignment</li>
            <li>Market-based instruments</li>
          </ul>
        `,
        duration: '15 min',
        quiz: true
      }
    ],
    3: [
      {
        id: 1,
        title: 'Disaster Timeline and Impact Assessment',
        content: `
          <h3>The 2025 Sino-Metals Leach Dam Collapse</h3>
          <p>On February 15, 2025, the tailings dam at Sino-Metals Leach copper mine collapsed, releasing approximately 50 million liters of toxic, acidic waste into the Mwambashi River.</p>
          
          <h4>Timeline of Events:</h4>
          <table class="timeline-table">
            <tr><th>Time</th><th>Event</th></tr>
            <tr><td>14:30</td><td>First signs of dam instability detected</td></tr>
            <tr><td>15:45</td><td>Major breach occurs</td></tr>
            <tr><td>16:20</td><td>Toxic waste reaches Mwambashi River</td></tr>
            <tr><td>18:00</td><td>Contamination confirmed in Kafue River</td></tr>
          </table>
          
          <h4>Immediate Impacts:</h4>
          <ul>
            <li><strong>Water Supply:</strong> 2.5 million people lost access to clean water</li>
            <li><strong>Agriculture:</strong> 45,000 hectares of farmland contaminated</li>
            <li><strong>Fisheries:</strong> Complete collapse of local fishing industry</li>
            <li><strong>Health:</strong> 15,000 immediate hospitalizations</li>
          </ul>
          
          <h4>Economic Costs (Initial Estimate):</h4>
          <ul>
            <li>Emergency response: $15 million</li>
            <li>Water treatment: $8 million</li>
            <li>Agricultural compensation: $25 million</li>
            <li>Healthcare costs: $12 million</li>
          </ul>
        `,
        duration: '20 min',
        caseStudy: true
      }
    ]
  };
  
  const courseModules = modules[req.params.id] || [];
  res.json(courseModules);
});

// Extended Quiz System
app.get('/api/quizzes/:courseId', (req, res) => {
  const quizzes = {
    1: [
      {
        id: 1,
        question: 'What is the primary focus of environmental economics?',
        options: [
          'Studying how economic activities affect the environment and designing efficient policies',
          'Analyzing stock market trends in green companies',
          'Promoting unlimited economic growth regardless of environmental impact',
          'Focusing only on wildlife conservation without economic considerations'
        ],
        correctAnswer: 0,
        explanation: 'Environmental economics specifically examines the relationship between economic activity and environmental quality, and designs policies to achieve environmental goals efficiently.'
      },
      {
        id: 2,
        question: 'Which of the following best describes "negative externality"?',
        options: [
          'A cost imposed on third parties not involved in an economic transaction',
          'A benefit received by consumers from government subsidies',
          'Profit made by companies through environmental innovation',
          'Tax revenue generated from environmental policies'
        ],
        correctAnswer: 0,
        explanation: 'Negative externalities occur when the production or consumption of a good or service imposes costs on third parties who are not compensated.'
      },
      {
        id: 3,
        question: 'In the context of African development, why is environmental economics particularly important?',
        options: [
          'African economies are heavily dependent on natural resources and vulnerable to environmental degradation',
          'African countries have no environmental challenges',
          'Environmental protection is only relevant for developed nations',
          'African economic growth is completely separate from environmental factors'
        ],
        correctAnswer: 0,
        explanation: 'Many African economies rely heavily on agriculture, mining, and natural resources, making them particularly vulnerable to environmental degradation and climate change impacts.'
      }
    ],
    3: [
      {
        id: 1,
        question: 'What was the estimated volume of toxic waste released in the 2025 Zambia mining disaster?',
        options: [
          '50 million liters',
          '5 million liters', 
          '500 million liters',
          '1 million liters'
        ],
        correctAnswer: 0,
        explanation: 'The Sino-Metals Leach dam collapse released approximately 50 million liters of toxic, acidic mining waste into the Mwambashi River.'
      },
      {
        id: 2,
        question: 'Which river system was primarily affected by the mining disaster?',
        options: [
          'Kafue River system',
          'Zambezi River system',
          'Congo River system',
          'Nile River system'
        ],
        correctAnswer: 0,
        explanation: 'The toxic waste contaminated the Mwambashi River, which flows into the Kafue River - a vital water source for nearly 60% of Zambia\'s population.'
      },
      {
        id: 3,
        question: 'What were the main economic impacts beyond immediate cleanup costs?',
        options: [
          'Long-term healthcare costs, lost agricultural productivity, and compensation payments',
          'Only the immediate costs of water treatment',
          'Increased tourism revenue due to international attention',
          'No significant long-term economic impacts'
        ],
        correctAnswer: 0,
        explanation: 'Beyond immediate cleanup, the disaster caused substantial long-term costs including healthcare for affected populations, lost agricultural productivity, fisheries collapse, and extensive compensation requirements.'
      }
    ]
  };
  
  const courseQuizzes = quizzes[req.params.courseId] || [];
  res.json(courseQuizzes);
});

// Additional Resources Endpoint
app.get('/api/resources', (req, res) => {
  const resources = [
    {
      id: 1,
      title: 'Zambia Environmental Management Act 2024',
      type: 'legal',
      description: 'Complete text of Zambia\'s updated environmental legislation',
      url: '#',
      category: 'policy'
    },
    {
      id: 2,
      title: 'African Green Economy Report 2024',
      type: 'report',
      description: 'UNEP analysis of green economic opportunities across Africa',
      url: '#',
      category: 'research'
    },
    {
      id: 3,
      title: 'Carbon Pricing in Developing Countries',
      type: 'guide',
      description: 'Practical guide to implementing carbon markets in African contexts',
      url: '#',
      category: 'policy'
    }
  ];
  res.json(resources);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});