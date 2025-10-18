import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import './CourseManagement.css';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        short_description: '',
        duration: '',
        level: 'beginner',
        category: '',
        price: 0,
        is_published: false
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await adminAPI.getCourses();
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCourse) {
                await adminAPI.updateCourse(editingCourse.id, formData);
            } else {
                await adminAPI.createCourse(formData);
            }
            setShowForm(false);
            setEditingCourse(null);
            resetForm();
            fetchCourses();
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            description: course.description,
            short_description: course.short_description || '',
            duration: course.duration,
            level: course.level,
            category: course.category,
            price: course.price || 0,
            is_published: course.is_published
        });
        setShowForm(true);
    };

    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            try {
                await adminAPI.deleteCourse(courseId);
                fetchCourses();
            } catch (error) {
                console.error('Error deleting course:', error);
                alert('Error deleting course. Please try again.');
            }
        }
    };

    const handlePublishToggle = async (courseId, currentStatus) => {
        try {
            await adminAPI.updateCourse(courseId, { is_published: !currentStatus });
            fetchCourses();
        } catch (error) {
            console.error('Error updating course status:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            short_description: '',
            duration: '',
            level: 'beginner',
            category: '',
            price: 0,
            is_published: false
        });
    };

    const categories = [
        'Environmental Economics',
        'Climate Policy',
        'Sustainable Development',
        'Renewable Energy',
        'Conservation',
        'Circular Economy',
        'Biodiversity',
        'Environmental Justice'
    ];

    if (loading) {
        return (
            <div className="course-management">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="course-management">
            <div className="admin-header">
                <div className="header-content">
                    <h1>Course Management 📚</h1>
                    <p>Create and manage courses on the platform</p>
                </div>
                <button 
                    className="cta-button primary"
                    onClick={() => {
                        setEditingCourse(null);
                        resetForm();
                        setShowForm(true);
                    }}
                >
                    + Create New Course
                </button>
            </div>

            {/* Course Form Modal */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{editingCourse ? 'Edit Course' : 'Create New Course'}</h3>
                            <button 
                                className="close-btn"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingCourse(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="course-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Course Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        required
                                        placeholder="Enter course title"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        required
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Short Description</label>
                                <textarea
                                    value={formData.short_description}
                                    onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                                    rows="2"
                                    placeholder="Brief description for course cards"
                                />
                            </div>

                            <div className="form-group">
                                <label>Full Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows="4"
                                    required
                                    placeholder="Detailed course description"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                        placeholder="e.g., 4 weeks, 30 hours"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Level</label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => setFormData({...formData, level: e.target.value})}
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                                    />
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_published}
                                        onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                                    />
                                    <span className="checkmark"></span>
                                    Publish course immediately
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="cta-button primary">
                                    {editingCourse ? 'Update Course' : 'Create Course'}
                                </button>
                                <button 
                                    type="button" 
                                    className="cta-button secondary"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingCourse(null);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Courses List */}
            <div className="courses-grid">
                {courses.map(course => (
                    <div key={course.id} className="course-card admin">
                        <div className="course-header">
                            <div className="course-icon">{course.image || '📚'}</div>
                            <div className="course-status">
                                <span className={`status-badge ${course.is_published ? 'published' : 'draft'}`}>
                                    {course.is_published ? 'Published' : 'Draft'}
                                </span>
                            </div>
                        </div>

                        <div className="course-content">
                            <h3>{course.title}</h3>
                            <p className="course-description">
                                {course.short_description || course.description?.substring(0, 100)}...
                            </p>
                            
                            <div className="course-meta">
                                <span className="meta-item">
                                    <strong>Level:</strong> {course.level}
                                </span>
                                <span className="meta-item">
                                    <strong>Duration:</strong> {course.duration}
                                </span>
                                <span className="meta-item">
                                    <strong>Category:</strong> {course.category}
                                </span>
                            </div>

                            <div className="course-stats">
                                <div className="stat">
                                    <span className="number">{course.enrolled_students || 0}</span>
                                    <span className="label">Students</span>
                                </div>
                                <div className="stat">
                                    <span className="number">{Math.round(course.avg_progress || 0)}%</span>
                                    <span className="label">Progress</span>
                                </div>
                                <div className="stat">
                                    <span className="number">${course.price || 0}</span>
                                    <span className="label">Price</span>
                                </div>
                            </div>
                        </div>

                        <div className="course-actions">
                            <button
                                className="action-btn primary"
                                onClick={() => handleEdit(course)}
                            >
                                Edit
                            </button>
                            <button
                                className={`action-btn ${course.is_published ? 'secondary' : 'success'}`}
                                onClick={() => handlePublishToggle(course.id, course.is_published)}
                            >
                                {course.is_published ? 'Unpublish' : 'Publish'}
                            </button>
                            <button
                                className="action-btn danger"
                                onClick={() => handleDelete(course.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {courses.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">📚</div>
                    <h3>No courses yet</h3>
                    <p>Create your first course to get started</p>
                    <button 
                        className="cta-button primary"
                        onClick={() => setShowForm(true)}
                    >
                        Create First Course
                    </button>
                </div>
            )}
        </div>
    );
};

export default CourseManagement;