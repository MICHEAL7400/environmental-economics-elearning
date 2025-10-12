// client/src/components/CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course details
        const courseResponse = await axios.get(`http://localhost:5000/api/courses`);
        const selectedCourse = courseResponse.data.find(c => c.id === parseInt(courseId));
        setCourse(selectedCourse);

        // Fetch modules
        const modulesResponse = await axios.get(`http://localhost:5000/api/courses/${courseId}/modules`);
        setModules(modulesResponse.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (!course) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="course-detail">
      <div className="container">
        {/* Course Header */}
        <div className="course-header">
          <div className="course-hero">
            <span className="course-icon">{course.image}</span>
            <div className="course-info">
              <h1>{course.title}</h1>
              <p className="course-description">{course.description}</p>
              <div className="course-meta-grid">
                <div className="meta-item">
                  <strong>Duration</strong>
                  <span>{course.duration}</span>
                </div>
                <div className="meta-item">
                  <strong>Level</strong>
                  <span>{course.level}</span>
                </div>
                <div className="meta-item">
                  <strong>Modules</strong>
                  <span>{course.modules}</span>
                </div>
                <div className="meta-item">
                  <strong>Instructor</strong>
                  <span>{course.instructor}</span>
                </div>
                <div className="meta-item">
                  <strong>Rating</strong>
                  <span>⭐ {course.rating}/5.0</span>
                </div>
                <div className="meta-item">
                  <strong>Students</strong>
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="course-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => setActiveTab('modules')}
          >
            📚 Modules
          </button>
          <button 
            className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            📎 Resources
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="learning-objectives">
                <h3>🎯 Learning Objectives</h3>
                <ul>
                  {course.learningObjectives?.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div className="syllabus-preview">
                <h3>📖 Course Syllabus</h3>
                <ol>
                  {course.syllabus?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>

              <div className="instructor-bio">
                <h3>👨‍🏫 About the Instructor</h3>
                <p><strong>{course.instructor}</strong> - Expert in environmental economics with extensive experience in African development contexts.</p>
              </div>
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="modules-content">
              <h3>Course Modules</h3>
              <div className="modules-list">
                {modules.length > 0 ? (
                  modules.map(module => (
                    <div key={module.id} className="module-card">
                      <div className="module-header">
                        <h4>{module.title}</h4>
                        <span className="module-duration">{module.duration}</span>
                      </div>
                      <div 
                        className="module-content"
                        dangerouslySetInnerHTML={{ __html: module.content }}
                      />
                      {module.quiz && (
                        <div className="module-quiz-badge">
                          🎯 Includes Quiz
                        </div>
                      )}
                      {module.resources && (
                        <div className="module-resources">
                          <h5>📎 Resources:</h5>
                          {module.resources.map((resource, idx) => (
                            <a key={idx} href={resource.url} className="resource-link">
                              {resource.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="no-modules">
                    <p>Detailed modules coming soon! Start with the quiz to test your knowledge.</p>
                    <Link to={`/quiz/${courseId}`} className="cta-button">
                      Take Course Quiz 🚀
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="resources-content">
              <h3>Additional Resources</h3>
              <div className="resources-grid">
                <div className="resource-card">
                  <h4>📚 Recommended Reading</h4>
                  <ul>
                    <li>"Environmental Economics in Developing Countries" - Dr. A. Mensah</li>
                    <li>"The Green Economy Transition in Africa" - UNEP Report</li>
                    <li>"Climate Policy and Economic Development" - World Bank</li>
                  </ul>
                </div>
                <div className="resource-card">
                  <h4>🌍 Case Studies</h4>
                  <ul>
                    <li>Rwanda Green Fund (FONERWA) Success Story</li>
                    <li>Kenya Renewable Energy Transition</li>
                    <li>South Africa Carbon Tax Implementation</li>
                  </ul>
                </div>
                <div className="resource-card">
                  <h4>📊 Data Sources</h4>
                  <ul>
                    <li>World Bank Environmental Data</li>
                    <li>African Development Bank Statistics</li>
                    <li>Zambia Environmental Management Agency</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="course-actions">
          <Link to={`/quiz/${courseId}`} className="cta-button primary">
            Start Learning Journey 🚀
          </Link>
          <button className="cta-button secondary">
            📥 Download Course Materials
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;