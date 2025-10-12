// client/src/App.js - COMPLETE WITH ALL PAGES AND CSS IMPORTS
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ==================== IMPORT ALL CSS FILES ====================
// Global Styles
// import './styles/index.css';

// Component Styles
import './components/Header.css';
import './App.css'

// Page Styles
import './components/Home.css';
import './components/Courses.css';
import './components/CourseDetail.css';
import './components/Quiz.css';
import './components/Toools.css';
import './components/CaseStudies.css';
import './components/Statistics.css';

// ==================== IMPORT ALL COMPONENTS ====================
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Quiz from './components/Quiz';
import Tools from './components/Tools';
import CaseStudies from './components/CaseStudies';
import Statistics from './components/Statistics';

// New Components (you can create these later)
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/Error/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/quiz/:courseId" element={<Quiz />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/statistics" element={<Statistics />} />
            
            {/* New Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Error Pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;