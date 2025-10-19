import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import './CourseManager.css';

const CourseManager = () => {
    const [courses, setCourses] = useState([]);
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
            short_description: course.short_description,
            duration: course.duration,
            level: course.level,
            category: course.category,
            price: course.price,
            is_published: course.is_published
        });
        setShowForm(true);
    };

    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await adminAPI.deleteCourse(courseId);
                fetchCourses();
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    return (
        <div className="course-manager">
            <div className="manager-header">
                <h2>Course Management</h2>
                <button 
                    className="cta-button primary"
                    onClick={() => setShowForm(true)}
                >
                    + Add New Course
                </button>
            </div>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editingCourse ? 'Edit Course' : 'Create New Course'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Course Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Short Description</label>
                                <textarea
                                    value={formData.short_description}
                                    onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                                    rows="2"
                                />
                            </div>

                            <div className="form-group">
                                <label>Full Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                        placeholder="e.g., 4 weeks"
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
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_published}
                                        onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                                    />
                                    Publish Course
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

            <div className="courses-list">
                {courses.map(course => (
                    <div key={course.id} className="course-item">
                        <div className="course-info">
                            <h4>{course.title}</h4>
                            <p>{course.short_description}</p>
                            <div className="course-meta">
                                <span>Level: {course.level}</span>
                                <span>Duration: {course.duration}</span>
                                <span>Students: {course.students_count}</span>
                                <span className={`status ${course.is_published ? 'published' : 'draft'}`}>
                                    {course.is_published ? 'Published' : 'Draft'}
                                </span>
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
                                className="action-btn danger"
                                onClick={() => handleDelete(course.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseManager;