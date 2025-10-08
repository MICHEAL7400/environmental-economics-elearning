// client/src/App.js - UPDATED WITH ALL NEW COMPONENTS
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import ALL Components
import Header from './components/Header';
import Home from './components/Home';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Quiz from './components/Quiz';
import Tools from './components/Tools';
import CaseStudies from './components/CaseStudies';
import Statistics from './components/Statistics';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/quiz/:courseId" element={<Quiz />} />
            {/* NEW ROUTES */}
            <Route path="/tools" element={<Tools />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/dashboard" element={<div className="container"><h1>Dashboard Coming Soon! 🚀</h1></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;