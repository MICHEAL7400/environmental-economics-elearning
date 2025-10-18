import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Quiz from './components/Quiz';
import Tools from './components/Tools';
import CaseStudies from './components/CaseStudies';
import Statistics from './components/Statistics';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/Error/NotFound';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';
import UserManagement from './components/Admin/UserManagement';
import CourseManagement from './components/Admin/CourseManagement';

// Import CSS files
import './App.css';
import './components/Header.css';
import './components/Home.css';
import './components/Courses.css';
import './components/CourseDetail.css';
import './components/Quiz.css';
import './components/Tools.css';
import './components/CaseStudies.css';
import './components/Statistics.css';
import './components/Auth/Auth.css';
import './components/Dashboard/Dashboard.css';
import './components/Profile/Profile.css';
import './components/About.css';
import './components/Contact.css';
import './components/Error/NotFound.css';
import './components/Admin/AdminDashboard.css';
import './components/Admin/UserManagement.css';
import './components/Admin/CourseManagement.css';
import './components/Common/ProtectedRoute.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header />
                    <main>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/courses" element={<Courses />} />
                            <Route path="/course/:courseId" element={<CourseDetail />} />
                            <Route path="/quiz/:courseId" element={<Quiz />} />
                            <Route path="/tools" element={<Tools />} />
                            <Route path="/case-studies" element={<CaseStudies />} />
                            <Route path="/statistics" element={<Statistics />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Protected Routes - Regular Users */}
                            <Route 
                                path="/dashboard" 
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/profile" 
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                } 
                            />

                            {/* Protected Routes - Admin Only */}
                            <Route 
                                path="/admin/dashboard" 
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/admin/users" 
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <UserManagement />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/admin/courses" 
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <CourseManagement />
                                    </ProtectedRoute>
                                } 
                            />

                            {/* Error Route */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;