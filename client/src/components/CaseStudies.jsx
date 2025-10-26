// // client/src/components/CaseStudies.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CaseStudies = () => {
//   const [filter, setFilter] = useState('all');
//   const [caseStudies, setCaseStudies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCaseStudies = async () => {
//       try {
//         console.log('🔍 Fetching case studies from database...');
//         const response = await axios.get('http://localhost:5000/api/case-studies');
//         console.log('✅ Case studies from database:', response.data);
        
//         if (response.data && Array.isArray(response.data)) {
//           setCaseStudies(response.data);
//         } else {
//           throw new Error('Invalid response format from server');
//         }
        
//       } catch (error) {
//         console.error('❌ Error fetching case studies:', error);
//         setError('Failed to load case studies from database. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCaseStudies();
//   }, []);

//   // Get all unique tags for filters
//   const allTags = ['all', ...new Set(
//     caseStudies.flatMap(study => 
//       Array.isArray(study.tags) ? study.tags : []
//     )
//   )];

//   const filteredStudies = filter === 'all' 
//     ? caseStudies 
//     : caseStudies.filter(study => 
//         Array.isArray(study.tags) && study.tags.includes(filter)
//       );

//   if (loading) {
//     return (
//       <div className="case-studies">
//         <div className="container">
//           <div className="loading-spinner"></div>
//           <p>Loading case studies from database...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="case-studies">
//       <div className="container">
//         <div className="page-header">
//           <h1>📚 African Environmental Case Studies</h1>
//           <p>Real-world examples of environmental economics in action across Africa</p>
          
//           {error && (
//             <div className="error-banner">
//               ⚠️ {error}
//             </div>
//           )}

//           {/* Debug info */}
//           {caseStudies.length > 0 && (
//             <div style={{ 
//               background: '#e8f5e8', 
//               padding: '10px', 
//               borderRadius: '5px', 
//               marginBottom: '20px',
//               fontSize: '14px',
//               border: '1px solid #4caf50'
//             }}>
//               ✅ Connected to database: {caseStudies.length} case studies loaded
//             </div>
//           )}
//         </div>

//         <div className="filter-buttons">
//           {allTags.map(tag => (
//             <button
//               key={tag}
//               className={`filter-btn ${filter === tag ? 'active' : ''}`}
//               onClick={() => setFilter(tag)}
//             >
//               {tag === 'all' ? 'All Cases' : tag}
//             </button>
//           ))}
//         </div>

//         <div className="case-studies-grid">
//           {filteredStudies.length > 0 ? (
//             filteredStudies.map(study => (
//               <div key={study.id} className="case-study-card">
//                 <div className="case-header">
//                   <span className="case-image">{study.image || '📊'}</span>
//                   <div className="case-meta">
//                     <span className="country-flag">{study.country || 'Africa'}</span>
//                     <span className="sector-tag">{study.sector || 'Environmental'}</span>
//                     <span className="year">{study.year || '2024'}</span>
//                   </div>
//                 </div>
                
//                 <h3>{study.title}</h3>
//                 <p>{study.summary || 'No summary available'}</p>
                
//                 <div className="metrics-grid">
//                   {study.key_metrics && Object.entries(study.key_metrics).map(([key, value]) => (
//                     <div key={key} className="metric">
//                       <div className="metric-value">{value}</div>
//                       <div className="metric-label">
//                         {key.split('_').map(word => 
//                           word.charAt(0).toUpperCase() + word.slice(1)
//                         ).join(' ')}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="case-stats">
//                   <span>👁️ {study.view_count || 0} views</span>
//                   <span>📥 {study.download_count || 0} downloads</span>
//                   {study.is_featured && <span className="featured-badge">⭐ Featured</span>}
//                 </div>
                
//                 <div className="case-actions">
//                   <button className="read-more">Read Full Case Study →</button>
//                   <button className="download">📥 Download Data</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-studies">
//               {caseStudies.length === 0 ? (
//                 <>
//                   <h3>No case studies in database</h3>
//                   <p>Add some case studies to your database to see them here.</p>
//                 </>
//               ) : (
//                 <>
//                   <h3>No case studies found for "{filter}"</h3>
//                   <p>Try selecting a different category.</p>
//                   <button 
//                     className="filter-btn active"
//                     onClick={() => setFilter('all')}
//                   >
//                     Show All Case Studies
//                   </button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaseStudies;






// client/src/components/CaseStudies.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CaseStudies = () => {
  const [filter, setFilter] = useState('all');
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/case-studies');
        
        if (response.data && Array.isArray(response.data)) {
          setCaseStudies(response.data);
        } else {
          throw new Error('Invalid response format from server');
        }
        
      } catch (error) {
        setError('Failed to load case studies from database. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  // Get all unique tags for filters
  const allTags = ['all', ...new Set(
    caseStudies.flatMap(study => 
      Array.isArray(study.tags) ? study.tags : []
    )
  )];

  const filteredStudies = filter === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => 
        Array.isArray(study.tags) && study.tags.includes(filter)
      );

  if (loading) {
    return (
      <div className="case-studies">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Loading case studies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="case-studies">
      <div className="container">
        <div className="page-header">
          <h1>African Environmental Case Studies</h1>
          <p>Real-world examples of environmental economics in action across Africa</p>
          
          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}
        </div>

        <div className="filter-buttons">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`filter-btn ${filter === tag ? 'active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {tag === 'all' ? 'All Cases' : tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>

        <div className="case-studies-grid">
          {filteredStudies.length > 0 ? (
            filteredStudies.map(study => (
              <div key={study.id} className="case-study-card">
                <div className="case-header">
                  <div className="case-meta">
                    <span className="country-flag">{study.country}</span>
                    <span className="sector-tag">{study.sector}</span>
                    <span className="year">{study.year}</span>
                  </div>
                </div>
                
                <h3>{study.title}</h3>
                <p>{study.summary}</p>
                
                <div className="metrics-grid">
                  {study.key_metrics && Object.entries(study.key_metrics).map(([key, value]) => (
                    <div key={key} className="metric">
                      <div className="metric-value">{value}</div>
                      <div className="metric-label">
                        {key.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="case-stats">
                  <span className="views">{study.view_count || 0} views</span>
                  <span className="downloads">{study.download_count || 0} downloads</span>
                  {study.is_featured && <span className="featured-badge">Featured</span>}
                </div>
                
                <div className="case-actions">
                  <button className="read-more">Read Full Case Study</button>
                  <button className="download">Download Data</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-studies">
              {caseStudies.length === 0 ? (
                <>
                  <h3>No case studies in database</h3>
                  <p>Add some case studies to your database to see them here.</p>
                </>
              ) : (
                <>
                  <h3>No case studies found for "{filter}"</h3>
                  <p>Try selecting a different category.</p>
                  <button 
                    className="filter-btn active"
                    onClick={() => setFilter('all')}
                  >
                    Show All Case Studies
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;