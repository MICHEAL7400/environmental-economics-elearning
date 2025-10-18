import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import './Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await coursesAPI.getAll();
                setCourses(response.data);
            } catch (err) {
                setError('Failed to load courses');
                console.error('Error fetching courses:', err);
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

    if (error) {
        return (
            <div className="courses">
                <div className="container">
                    <div className="error-message">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Retry</button>
                    </div>
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