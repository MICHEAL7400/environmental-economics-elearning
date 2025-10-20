// client/src/components/Admin/CourseModules.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CourseModules = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [showAddModule, setShowAddModule] = useState(false);

  useEffect(() => {
    // Fetch course and modules data
    const fetchData = async () => {
      // Mock data - replace with actual API call
      const courseData = {
        id: parseInt(courseId),
        title: 'Carbon Pricing and Taxes',
        description: 'Master the mechanisms of carbon pricing and understand different tax models'
      };
      
      const modulesData = [
        {
          id: 1,
          title: 'Introduction to Carbon Pricing',
          order: 1,
          duration: '45 min',
          isPublished: true,
          lessons: 5,
          quizzes: 1
        },
        {
          id: 2,
          title: 'Carbon Tax Models',
          order: 2,
          duration: '60 min',
          isPublished: true,
          lessons: 4,
          quizzes: 1
        },
        {
          id: 3,
          title: 'Cap and Trade Systems',
          order: 3,
          duration: '50 min',
          isPublished: false,
          lessons: 3,
          quizzes: 0
        }
      ];

      setCourse(courseData);
      setModules(modulesData);
    };

    fetchData();
  }, [courseId]);

  const handleAddModule = (moduleData) => {
    const newModule = {
      id: modules.length + 1,
      ...moduleData,
      order: modules.length + 1,
      isPublished: false,
      lessons: 0,
      quizzes: 0
    };
    setModules([...modules, newModule]);
    setShowAddModule(false);
  };

  const handleDeleteModule = (moduleId) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      setModules(modules.filter(module => module.id !== moduleId));
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-modules">
      <div className="page-header">
        <div className="header-left">
          <button 
            onClick={() => navigate('/admin/courses')}
            className="btn-back"
          >
            ← Back to Courses
          </button>
          <h1>Modules: {course.title}</h1>
          <p>{course.description}</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowAddModule(true)}
        >
          + Add Module
        </button>
      </div>

      <div className="content-card">
        <div className="modules-list">
          {modules.map(module => (
            <div key={module.id} className="module-card">
              <div className="module-header">
                <div className="module-info">
                  <h3>Module {module.order}: {module.title}</h3>
                  <div className="module-meta">
                    <span>⏱️ {module.duration}</span>
                    <span>📚 {module.lessons} lessons</span>
                    <span>❓ {module.quizzes} quizzes</span>
                    <span className={`status ${module.isPublished ? 'published' : 'draft'}`}>
                      {module.isPublished ? '✅ Published' : '📝 Draft'}
                    </span>
                  </div>
                </div>
                <div className="module-actions">
                  <button className="btn-edit">Edit</button>
                  <button className="btn-lessons">Manage Lessons</button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteModule(module.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modules.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No modules yet</h3>
            <p>Start by adding your first module to this course</p>
            <button 
              className="btn-primary"
              onClick={() => setShowAddModule(true)}
            >
              Add First Module
            </button>
          </div>
        )}
      </div>

      {/* Add Module Modal */}
      {showAddModule && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Module</h2>
              <button onClick={() => setShowAddModule(false)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleAddModule({
                  title: formData.get('title'),
                  duration: formData.get('duration')
                });
              }}>
                <div className="form-group">
                  <label>Module Title</label>
                  <input 
                    type="text" 
                    name="title"
                    placeholder="Enter module title" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input 
                    type="text" 
                    name="duration"
                    placeholder="e.g., 45 min" 
                    required 
                  />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setShowAddModule(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Module
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

export default CourseModules;