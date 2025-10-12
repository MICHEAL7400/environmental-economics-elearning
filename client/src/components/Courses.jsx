// client/src/components/Courses.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Enhanced mock data
        setCourses([
          {
            id: 1,
            title: 'Introduction to Environmental Economics',
            description: 'Learn the fundamental concepts of environmental economics and understand why balancing economic growth with environmental protection is crucial for sustainable development.',
            duration: '30 min',
            level: 'Beginner',
            category: 'fundamentals',
            students: 250,
            rating: 4.8,
            image: '🌱'
          },
          {
            id: 2,
            title: 'Carbon Pricing and Taxes',
            description: 'Master the mechanisms of carbon pricing, understand different tax models, and analyze their economic impacts on businesses and communities.',
            duration: '45 min',
            level: 'Intermediate',
            category: 'policy',
            students: 180,
            rating: 4.6,
            image: '💰'
          },
          {
            id: 3,
            title: 'Case Study: Zambia Mining Disaster',
            description: 'Deep dive into the 2025 Sino-Metals dam collapse. Analyze economic consequences, policy responses, and lessons for sustainable mining.',
            duration: '60 min',
            level: 'Advanced',
            category: 'case-study',
            students: 320,
            rating: 4.9,
            image: '⚠️'
          },
          {
            id: 4,
            title: 'Renewable Energy Economics',
            description: 'Explore the economic viability of solar, wind, and hydro power in African contexts. Cost-benefit analysis and investment strategies.',
            duration: '50 min',
            level: 'Intermediate',
            category: 'energy',
            students: 195,
            rating: 4.7,
            image: '⚡'
          },
          {
            id: 5,
            title: 'Climate Finance and Green Investment',
            description: 'Master climate finance mechanisms, green bonds, and investment strategies for sustainable development in African markets.',
            duration: '70 min',
            level: 'Advanced',
            category: 'finance',
            students: 420,
            rating: 4.7,
            image: '💹'
          },
          {
            id: 6,
            title: 'Circular Economy and Waste Management',
            description: 'Explore the economic principles behind circular economy models and sustainable waste management systems in urban Africa.',
            duration: '55 min',
            level: 'Intermediate',
            category: 'circular-economy',
            students: 380,
            rating: 4.5,
            image: '🔄'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(course => course.category === filter);

  if (loading) {
    return (
      <div className="courses">
        <div className="container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses">
      <div className="container">
        <div className="courses-header">
          <h1>Explore Our Courses</h1>
          <p>Choose from our carefully curated courses designed for African learners</p>
          
          {/* Filter Buttons */}
          <div className="course-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Courses
            </button>
            <button 
              className={`filter-btn ${filter === 'fundamentals' ? 'active' : ''}`}
              onClick={() => setFilter('fundamentals')}
            >
              Fundamentals
            </button>
            <button 
              className={`filter-btn ${filter === 'policy' ? 'active' : ''}`}
              onClick={() => setFilter('policy')}
            >
              Policy
            </button>
            <button 
              className={`filter-btn ${filter === 'case-study' ? 'active' : ''}`}
              onClick={() => setFilter('case-study')}
            >
              Case Studies
            </button>
            <button 
              className={`filter-btn ${filter === 'energy' ? 'active' : ''}`}
              onClick={() => setFilter('energy')}
            >
              Energy
            </button>
            <button 
              className={`filter-btn ${filter === 'finance' ? 'active' : ''}`}
              onClick={() => setFilter('finance')}
            >
              Finance
            </button>
          </div>
        </div>

        <div className="course-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-icon">{course.image}</div>
              <div className="course-badge">{course.level}</div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              
              <div className="course-meta">
                <span>⏱️ {course.duration}</span>
                <span>👥 {course.students} students</span>
                <span>⭐ {course.rating}</span>
              </div>
              
              <div className="course-actions">
                <Link to={`/course/${course.id}`}>
                  <button className="course-btn primary">
                    Explore Course 📖
                  </button>
                </Link>
                <Link to={`/quiz/${course.id}`}>
                  <button className="course-btn secondary">
                    Take Quiz 🎯
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Courses Message */}
        {filteredCourses.length === 0 && (
          <div className="no-courses">
            <h3>No courses found for this filter</h3>
            <p>Try selecting a different category or check back later for new courses!</p>
            <button 
              className="filter-btn active"
              onClick={() => setFilter('all')}
            >
              Show All Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;