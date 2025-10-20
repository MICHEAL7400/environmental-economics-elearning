// client/src/components/Admin/CourseManagement.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    // Fetch courses
    const fetchCourses = async () => {
      // Mock data
      setCourses([
        {
          id: 1,
          title: 'Introduction to Environmental Economics',
          category: 'fundamentals',
          level: 'Beginner',
          students: 250,
          rating: 4.8,
          status: 'published',
          created: '2024-01-15'
        },
        {
          id: 2,
          title: 'Carbon Pricing and Taxes',
          category: 'policy',
          level: 'Intermediate',
          students: 180,
          rating: 4.6,
          status: 'published',
          created: '2024-02-10'
        },
        {
          id: 3,
          title: 'Advanced Climate Finance',
          category: 'finance',
          level: 'Advanced',
          students: 95,
          rating: 4.9,
          status: 'draft',
          created: '2024-03-05'
        }
      ]);
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const handleStatusChange = (courseId, newStatus) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, status: newStatus } : course
    ));
  };

  return (
    <div className="course-management">
      <div className="page-header">
        <h1>Course Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add New Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="content-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Category</th>
                <th>Level</th>
                <th>Students</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>
                    <strong>{course.title}</strong>
                  </td>
                  <td>
                    <span className="category-badge">{course.category}</span>
                  </td>
                  <td>
                    <span className="level-badge">{course.level}</span>
                  </td>
                  <td>{course.students}</td>
                  <td>
                    <span className="rating">⭐ {course.rating}</span>
                  </td>
                  <td>
                    <select
                      value={course.status}
                      onChange={(e) => handleStatusChange(course.id, e.target.value)}
                      className={`status-select ${course.status}`}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link 
                        to={`/admin/courses/${course.id}/edit`}
                        className="btn-edit"
                      >
                        Edit
                      </Link>
                      <Link 
                        to={`/admin/courses/${course.id}/modules`}
                        className="btn-view"
                      >
                        Modules
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Course Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Course</h2>
              <button onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <form className="course-form">
                <div className="form-group">
                  <label>Course Title</label>
                  <input type="text" placeholder="Enter course title" />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select>
                    <option value="fundamentals">Fundamentals</option>
                    <option value="policy">Policy</option>
                    <option value="case-study">Case Study</option>
                    <option value="energy">Energy</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Level</label>
                  <select>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea rows="4" placeholder="Course description"></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;