// client/src/App.js - UPDATED WITH ADMIN DASHBOARD AND ROUTE PROTECTION
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ==================== IMPORT ALL CSS FILES ====================
// Global Styles
// import './styles/index.css';

// Component Styles
import './components/Header.css';
import './components/Footer.css';
import './App.css';

// Page Styles
import './components/Home.css';
import './components/Courses.css';
import './components/CourseDetail.css';
import './components/Quiz.css';
import './components/Tools/Tools.css';
import './components/CaseStudies.css';
import './components/Statistics.css';

// Auth & Other Styles
// import './components/Auth/Login.css';
// import './components/Auth/Register.css';
import './components/Dashboard/Dashboard.css';
import './components/Profile/Profile.css';
import './components/About.css';
import './components/Contact.css';
import './components/Error/Error.css';

// Admin Styles
import './components/Admin/AdminDashboard.css';

// ==================== IMPORT ALL COMPONENTS ====================
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Quiz from './components/Quiz';
// import Tools from './components/Tools/Tools';
import CaseStudies from './components/CaseStudies';
import Statistics from './components/Statistics';

// Tools Sub-components
import Calculator from './components/Tools/Calculator';
import Converter from './components/Tools/Converter';
import Analytics from './components/Tools/Analytics';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// User Components
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';

// Informational Components
import About from './components/About';
import Contact from './components/Contact';

// Error Components
import NotFound from './components/Error/NotFound';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminRoute from './components/Admin/AdminRoute';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header and Footer are not shown on admin pages */}
        <Routes>
          {/* Admin Routes - Protected */}
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
          {/* Public Routes */}
          <Route path="*" element={
            <>
              <Header />
              <main className="main-content">
                <Routes>
                  {/* Core Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:courseId" element={<CourseDetail />} />
                  <Route path="/quiz/:courseId" element={<Quiz />} />
                  
                  {/* Tools Pages */}
                  {/* <Route path="/tools" element={<Tools />} /> */}
                  <Route path="/tools/calculator" element={<Calculator />} />
                  <Route path="/tools/converter" element={<Converter />} />
                  <Route path="/tools/analytics" element={<Analytics />} />
                  
                  {/* Learning Pages */}
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/statistics" element={<Statistics />} />
                  
                  {/* Auth & User Pages */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  
                  {/* Informational Pages */}
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Error Pages */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;