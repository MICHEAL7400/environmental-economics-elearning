// client/src/components/Admin/CourseEdit.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CourseEdit = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch course data
    const fetchCourse = async () => {
      // Mock data - replace with actual API call
      const courseData = {
        id: parseInt(courseId),
        title: 'Carbon Pricing and Taxes',
        description: 'Master the mechanisms of carbon pricing and understand different tax models',
        category: 'policy',
        level: 'intermediate',
        price: 49.99,
        isPublished: true
      };
      setCourse(courseData);
    };

    fetchCourse();
  }, [courseId]);

  const handleSave = (e) => {
    e.preventDefault();
    // Save course logic here
    alert('Course saved successfully!');
    navigate('/admin/courses');
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-edit">
      <div className="page-header">
        <button 
          onClick={() => navigate('/admin/courses')}
          className="btn-back"
        >
          ← Back to Courses
        </button>
        <h1>Edit Course: {course.title}</h1>
      </div>

      <div className="content-card">
        <form onSubmit={handleSave} className="course-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Course Title</label>
              <input 
                type="text" 
                value={course.title}
                onChange={(e) => setCourse({...course, title: e.target.value})}
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select 
                value={course.category}
                onChange={(e) => setCourse({...course, category: e.target.value})}
              >
                <option value="fundamentals">Fundamentals</option>
                <option value="policy">Policy</option>
                <option value="case-study">Case Study</option>
                <option value="energy">Energy</option>
                <option value="finance">Finance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Level</label>
              <select 
                value={course.level}
                onChange={(e) => setCourse({...course, level: e.target.value})}
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
                value={course.price}
                onChange={(e) => setCourse({...course, price: parseFloat(e.target.value)})}
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea 
                rows="6"
                value={course.description}
                onChange={(e) => setCourse({...course, description: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={course.isPublished}
                  onChange={(e) => setCourse({...course, isPublished: e.target.checked})}
                />
                Published
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin/courses')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEdit;