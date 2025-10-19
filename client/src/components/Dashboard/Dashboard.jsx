// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     // Mock user data
//     setUser({
//       name: 'Sarah Johnson',
//       email: 'sarah.johnson@example.com',
//       country: 'Kenya',
//       userType: 'student',
//       joinDate: '2024-01-15',
//       avatar: '👩‍🎓'
//     });
//   }, []);

//   const stats = {
//     coursesCompleted: 3,
//     coursesInProgress: 2,
//     totalPoints: 1250,
//     currentStreak: 7,
//     quizzesTaken: 8,
//     certificates: 2
//   };

//   const enrolledCourses = [
//     {
//       id: 1,
//       title: 'Introduction to Environmental Economics',
//       progress: 85,
//       nextModule: 'Carbon Pricing Mechanisms',
//       lastActivity: '2 days ago',
//       image: '🌱'
//     },
//     {
//       id: 2,
//       title: 'Carbon Pricing and Taxes',
//       progress: 45,
//       nextModule: 'Tax Implementation Strategies',
//       lastActivity: '1 week ago',
//       image: '💰'
//     }
//   ];

//   const achievements = [
//     { name: 'First Steps', icon: '🚀', description: 'Complete your first module', earned: true },
//     { name: 'Quiz Master', icon: '🎯', description: 'Score 100% on 5 quizzes', earned: true },
//     { name: 'Case Study Expert', icon: '📖', description: 'Read 10 case studies', earned: false },
//     { name: 'Environmental Champion', icon: '🌍', description: 'Complete all courses', earned: false }
//   ];

//   const recentActivity = [
//     { action: 'Completed quiz', course: 'Introduction to Environmental Economics', time: '2 hours ago', score: '95%' },
//     { action: 'Started module', course: 'Carbon Pricing and Taxes', time: '1 day ago', module: 'Tax Models' },
//     { action: 'Earned badge', course: 'Achievement', time: '2 days ago', badge: 'Quiz Master' },
//     { action: 'Downloaded resource', course: 'Case Studies', time: '3 days ago', resource: 'Zambia Mining Report' }
//   ];

//   if (!user) {
//     return <div className="loading-spinner"></div>;
//   }

//   return (
//     <div className="dashboard">
//       <div className="container">
//         {/* Dashboard Header */}
//         <div className="dashboard-header">
//           <div className="user-welcome">
//             <div className="user-avatar">{user.avatar}</div>
//             <div className="user-info">
//               <h1>Welcome back, {user.name}! 👋</h1>
//               <p>Continue your journey in environmental economics</p>
//             </div>
//           </div>
//           <div className="dashboard-actions">
//             <Link to="/courses" className="cta-button primary">
//               Browse Courses 📚
//             </Link>
//           </div>
//         </div>

//         {/* Stats Overview */}
//         <div className="stats-grid">
//           <div className="stat-card">
//             <div className="stat-icon">📊</div>
//             <div className="stat-info">
//               <h3>{stats.coursesCompleted}</h3>
//               <p>Courses Completed</p>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">🎯</div>
//             <div className="stat-info">
//               <h3>{stats.coursesInProgress}</h3>
//               <p>Courses in Progress</p>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">⭐</div>
//             <div className="stat-info">
//               <h3>{stats.totalPoints}</h3>
//               <p>Total Points</p>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">🔥</div>
//             <div className="stat-info">
//               <h3>{stats.currentStreak}</h3>
//               <p>Day Streak</p>
//             </div>
//           </div>
//         </div>

//         {/* Dashboard Tabs */}
//         <div className="dashboard-tabs">
//           <button 
//             className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
//             onClick={() => setActiveTab('overview')}
//           >
//             📋 Overview
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
//             onClick={() => setActiveTab('courses')}
//           >
//             📚 My Courses
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
//             onClick={() => setActiveTab('achievements')}
//           >
//             🏆 Achievements
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
//             onClick={() => setActiveTab('activity')}
//           >
//             📈 Activity
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="tab-content">
//           {activeTab === 'overview' && (
//             <div className="overview-grid">
//               {/* Continue Learning */}
//               <div className="dashboard-section">
//                 <h2>Continue Learning</h2>
//                 <div className="courses-grid">
//                   {enrolledCourses.map(course => (
//                     <div key={course.id} className="course-progress-card">
//                       <div className="course-header">
//                         <span className="course-icon">{course.image}</span>
//                         <div className="course-info">
//                           <h4>{course.title}</h4>
//                           <p>Next: {course.nextModule}</p>
//                         </div>
//                       </div>
//                       <div className="progress-section">
//                         <div className="progress-bar">
//                           <div 
//                             className="progress-fill" 
//                             style={{ width: `${course.progress}%` }}
//                           ></div>
//                         </div>
//                         <span className="progress-text">{course.progress}%</span>
//                       </div>
//                       <div className="course-actions">
//                         <Link 
//                           to={`/course/${course.id}`} 
//                           className="continue-btn"
//                         >
//                           Continue →
//                         </Link>
//                         <span className="last-activity">{course.lastActivity}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Recent Activity */}
//               <div className="dashboard-section">
//                 <h2>Recent Activity</h2>
//                 <div className="activity-list">
//                   {recentActivity.slice(0, 3).map((activity, index) => (
//                     <div key={index} className="activity-item">
//                       <div className="activity-icon">📝</div>
//                       <div className="activity-details">
//                         <p><strong>{activity.action}</strong> in {activity.course}</p>
//                         <span className="activity-time">{activity.time}</span>
//                         {activity.score && <span className="activity-score">Score: {activity.score}</span>}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="dashboard-section">
//                 <h2>Quick Actions</h2>
//                 <div className="quick-actions-grid">
//                   <Link to="/tools" className="quick-action-card">
//                     <span className="action-icon">🛠️</span>
//                     <h4>Practical Tools</h4>
//                     <p>Use calculators and simulators</p>
//                   </Link>
//                   <Link to="/case-studies" className="quick-action-card">
//                     <span className="action-icon">📖</span>
//                     <h4>Case Studies</h4>
//                     <p>Explore real-world examples</p>
//                   </Link>
//                   <Link to="/statistics" className="quick-action-card">
//                     <span className="action-icon">📊</span>
//                     <h4>Statistics</h4>
//                     <p>View environmental data</p>
//                   </Link>
//                   <Link to="/quiz" className="quick-action-card">
//                     <span className="action-icon">🎯</span>
//                     <h4>Take a Quiz</h4>
//                     <p>Test your knowledge</p>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'courses' && (
//             <div className="courses-tab">
//               <h2>My Courses</h2>
//               <div className="enrolled-courses">
//                 {enrolledCourses.map(course => (
//                   <div key={course.id} className="enrolled-course-card">
//                     <div className="course-main">
//                       <span className="course-icon-large">{course.image}</span>
//                       <div className="course-details">
//                         <h3>{course.title}</h3>
//                         <p>Last activity: {course.lastActivity}</p>
//                         <div className="progress-section">
//                           <div className="progress-bar">
//                             <div 
//                               className="progress-fill" 
//                               style={{ width: `${course.progress}%` }}
//                             ></div>
//                           </div>
//                           <span className="progress-text">{course.progress}% complete</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="course-actions">
//                       <Link to={`/course/${course.id}`} className="cta-button primary">
//                         {course.progress === 0 ? 'Start' : 'Continue'}
//                       </Link>
//                       <Link to={`/quiz/${course.id}`} className="cta-button secondary">
//                         Take Quiz
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'achievements' && (
//             <div className="achievements-tab">
//               <h2>My Achievements</h2>
//               <div className="achievements-grid">
//                 {achievements.map((achievement, index) => (
//                   <div 
//                     key={index} 
//                     className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
//                   >
//                     <div className="achievement-icon">
//                       {achievement.icon}
//                     </div>
//                     <div className="achievement-info">
//                       <h4>{achievement.name}</h4>
//                       <p>{achievement.description}</p>
//                     </div>
//                     <div className="achievement-status">
//                       {achievement.earned ? '✅ Earned' : '🔒 Locked'}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'activity' && (
//             <div className="activity-tab">
//               <h2>Recent Activity</h2>
//               <div className="activity-timeline">
//                 {recentActivity.map((activity, index) => (
//                   <div key={index} className="timeline-item">
//                     <div className="timeline-marker"></div>
//                     <div className="timeline-content">
//                       <div className="activity-header">
//                         <h4>{activity.action}</h4>
//                         <span className="activity-time">{activity.time}</span>
//                       </div>
//                       <p className="activity-description">
//                         {activity.course}
//                         {activity.module && ` - ${activity.module}`}
//                         {activity.score && ` - Score: ${activity.score}`}
//                         {activity.badge && ` - Badge: ${activity.badge}`}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Set authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user data
      const userResponse = await axios.get('http://localhost:5000/api/auth/me');
      setUser(userResponse.data.user);

      // Fetch dashboard stats
      const statsResponse = await axios.get('http://localhost:5000/api/progress/stats');
      setStats(statsResponse.data);

      // Fetch enrolled courses with progress
      const coursesResponse = await axios.get('http://localhost:5000/api/progress/courses');
      setEnrolledCourses(coursesResponse.data.courses || []);

      // Fetch achievements
      const achievementsResponse = await axios.get('http://localhost:5000/api/progress/achievements');
      setAchievements(achievementsResponse.data.achievements || []);

      // Fetch recent activity
      const activityResponse = await axios.get('http://localhost:5000/api/progress/activity');
      setRecentActivity(activityResponse.data.activity || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchDashboardData();
  };

  // Default stats if API returns null
  const defaultStats = {
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalPoints: 0,
    currentStreak: 0,
    quizzesTaken: 0,
    certificates: 0
  };

  const displayStats = stats || defaultStats;

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">⚠️</div>
        <h3>Unable to load dashboard</h3>
        <p>{error}</p>
        <button onClick={refreshData} className="cta-button primary">
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">🔒</div>
        <h3>Authentication Required</h3>
        <p>Please log in to view your dashboard</p>
        <Link to="/login" className="cta-button primary">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="user-welcome">
            <div className="user-avatar">{user.avatar || '👤'}</div>
            <div className="user-info">
              <h1>Welcome back, {user.firstName} {user.lastName}! 👋</h1>
              <p>Continue your journey in environmental economics</p>
              <div className="user-meta">
                <span className="user-country">📍 {user.country || 'Not specified'}</span>
                <span className="user-role">🎓 {user.role || 'Student'}</span>
                <span className="join-date">📅 Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link to="/courses" className="cta-button primary">
              Browse Courses 📚
            </Link>
            <button onClick={refreshData} className="cta-button secondary">
              Refresh 🔄
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{displayStats.coursesCompleted}</h3>
              <p>Courses Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>{displayStats.coursesInProgress}</h3>
              <p>Courses in Progress</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>{displayStats.totalPoints}</h3>
              <p>Total Points</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-info">
              <h3>{displayStats.currentStreak}</h3>
              <p>Day Streak</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>{displayStats.quizzesTaken}</h3>
              <p>Quizzes Taken</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <h3>{displayStats.certificates}</h3>
              <p>Certificates</p>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            📚 My Courses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            🏆 Achievements
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            📈 Activity
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-grid">
              {/* Continue Learning */}
              <div className="dashboard-section">
                <h2>Continue Learning</h2>
                {enrolledCourses.length > 0 ? (
                  <div className="courses-grid">
                    {enrolledCourses.slice(0, 2).map(course => (
                      <div key={course.id} className="course-progress-card">
                        <div className="course-header">
                          <span className="course-icon">{course.image || '📚'}</span>
                          <div className="course-info">
                            <h4>{course.title}</h4>
                            <p>Next: {course.nextModule || 'Start learning'}</p>
                          </div>
                        </div>
                        <div className="progress-section">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${course.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{course.progress || 0}%</span>
                        </div>
                        <div className="course-actions">
                          <Link 
                            to={`/course/${course.id}`} 
                            className="continue-btn"
                          >
                            {course.progress > 0 ? 'Continue →' : 'Start →'}
                          </Link>
                          <span className="last-activity">{course.lastActivity || 'Not started'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📚</div>
                    <h4>No courses enrolled yet</h4>
                    <p>Start your learning journey by enrolling in a course</p>
                    <Link to="/courses" className="cta-button primary">
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="dashboard-section">
                <h2>Recent Activity</h2>
                {recentActivity.length > 0 ? (
                  <div className="activity-list">
                    {recentActivity.slice(0, 3).map((activity, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-icon">
                          {activity.type === 'quiz' ? '🎯' : 
                           activity.type === 'module' ? '📖' : 
                           activity.type === 'achievement' ? '🏆' : '📝'}
                        </div>
                        <div className="activity-details">
                          <p><strong>{activity.action}</strong> {activity.course && `in ${activity.course}`}</p>
                          <span className="activity-time">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </span>
                          {activity.score && <span className="activity-score">Score: {activity.score}%</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h4>No recent activity</h4>
                    <p>Your learning activity will appear here</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="dashboard-section">
                <h2>Quick Actions</h2>
                <div className="quick-actions-grid">
                  <Link to="/tools" className="quick-action-card">
                    <span className="action-icon">🛠️</span>
                    <h4>Practical Tools</h4>
                    <p>Use calculators and simulators</p>
                  </Link>
                  <Link to="/case-studies" className="quick-action-card">
                    <span className="action-icon">📖</span>
                    <h4>Case Studies</h4>
                    <p>Explore real-world examples</p>
                  </Link>
                  <Link to="/statistics" className="quick-action-card">
                    <span className="action-icon">📊</span>
                    <h4>Statistics</h4>
                    <p>View environmental data</p>
                  </Link>
                  <Link to="/quiz" className="quick-action-card">
                    <span className="action-icon">🎯</span>
                    <h4>Take a Quiz</h4>
                    <p>Test your knowledge</p>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="courses-tab">
              <h2>My Courses</h2>
              {enrolledCourses.length > 0 ? (
                <div className="enrolled-courses">
                  {enrolledCourses.map(course => (
                    <div key={course.id} className="enrolled-course-card">
                      <div className="course-main">
                        <span className="course-icon-large">{course.image || '📚'}</span>
                        <div className="course-details">
                          <h3>{course.title}</h3>
                          <p>{course.description}</p>
                          <div className="course-meta">
                            <span className="course-level">Level: {course.level || 'Beginner'}</span>
                            <span className="course-duration">Duration: {course.duration || 'Self-paced'}</span>
                          </div>
                          <div className="progress-section">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${course.progress || 0}%` }}
                              ></div>
                            </div>
                            <span className="progress-text">{course.progress || 0}% complete</span>
                          </div>
                        </div>
                      </div>
                      <div className="course-actions">
                        <Link to={`/course/${course.id}`} className="cta-button primary">
                          {course.progress > 0 ? 'Continue' : 'Start'}
                        </Link>
                        <Link to={`/quiz/${course.id}`} className="cta-button secondary">
                          Take Quiz
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📚</div>
                  <h4>No courses enrolled</h4>
                  <p>You haven't enrolled in any courses yet</p>
                  <Link to="/courses" className="cta-button primary">
                    Browse Available Courses
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements-tab">
              <h2>My Achievements</h2>
              {achievements.length > 0 ? (
                <div className="achievements-grid">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                    >
                      <div className="achievement-icon">
                        {achievement.icon || '🏆'}
                      </div>
                      <div className="achievement-info">
                        <h4>{achievement.name}</h4>
                        <p>{achievement.description}</p>
                        <span className="achievement-points">{achievement.points || 0} points</span>
                      </div>
                      <div className="achievement-status">
                        {achievement.earned ? 
                          `✅ Earned ${new Date(achievement.earnedAt).toLocaleDateString()}` : 
                          '🔒 Locked'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">🏆</div>
                  <h4>No achievements yet</h4>
                  <p>Complete courses and activities to earn achievements</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="activity-tab">
              <h2>Recent Activity</h2>
              {recentActivity.length > 0 ? (
                <div className="activity-timeline">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <div className="activity-header">
                          <h4>{activity.action}</h4>
                          <span className="activity-time">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="activity-description">
                          {activity.course}
                          {activity.module && ` - ${activity.module}`}
                          {activity.score && ` - Score: ${activity.score}%`}
                          {activity.badge && ` - Badge: ${activity.badge}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📈</div>
                  <h4>No activity recorded</h4>
                  <p>Your learning activities will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;