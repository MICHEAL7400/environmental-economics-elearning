// // client/src/App.js - FIXED VERSION
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // ==================== IMPORT ALL CSS FILES ====================
// import './components/Header.css';
// import './components/Footer.css';
// import './App.css';
// import './components/Home.css';
// import './components/Courses.css';
// import './components/CourseDetail.css';
// import './components/Quiz.css';
// import './components/Tools/Tools.css';
// import './components/CaseStudies.css';
// import './components/Statistics.css';
// import './components/Dashboard/Dashboard.css';
// import './components/Profile/Profile.css';
// import './components/About.css';
// import './components/Contact.css';
// import './components/Error/Error.css';
// import './components/Admin/AdminDashboard.css';

// // ==================== IMPORT ALL COMPONENTS ====================
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './components/Home';
// import Courses from './components/Courses';
// import CourseDetail from './components/CourseDetail';
// import Quiz from './components/Quiz';
// import CaseStudies from './components/CaseStudies';
// import Statistics from './components/Statistics';
// import Calculator from './components/Tools/Calculator';
// import Converter from './components/Tools/Converter';
// import Analytics from './components/Tools/Analytics';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import Dashboard from './components/Dashboard/Dashboard';
// import Profile from './components/Profile/Profile';
// import About from './components/About';
// import Contact from './components/Contact';
// import NotFound from './components/Error/NotFound';

// // Admin Components
// import AdminDashboard from './components/Admin/AdminDashboard';
// import AdminLogin from './components/Admin/AdminLogin';
// import AdminRoute from './components/Admin/AdminRoute';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* ==================== ADMIN ROUTES ==================== */}
//           {/* Admin Login - Public route (no header/footer) */}
//           <Route path="/admin/login" element={<AdminLogin />} />
          
//           {/* Admin Dashboard - Protected route (no header/footer) */}
//           <Route path="/admin/*" element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           } />
          
//           {/* ==================== MAIN PUBLIC ROUTES (with Header/Footer) ==================== */}
//           <Route path="*" element={
//             <MainLayout />
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// // Separate component for main layout with header/footer
// function MainLayout() {
//   return (
//     <>
//       <Header />
//       <main className="main-content">
//         <Routes>
//           {/* Core Pages */}
//           <Route path="/" element={<Home />} />
//           <Route path="/courses" element={<Courses />} />
//           <Route path="/course/:courseId" element={<CourseDetail />} />
//           <Route path="/quiz/:courseId" element={<Quiz />} />
          
//           {/* Tools Pages */}
//           <Route path="/tools/calculator" element={<Calculator />} />
//           <Route path="/tools/converter" element={<Converter />} />
//           <Route path="/tools/analytics" element={<Analytics />} />
          
//           {/* Learning Pages */}
//           <Route path="/case-studies" element={<CaseStudies />} />
//           <Route path="/statistics" element={<Statistics />} />
          
//           {/* Auth & User Pages */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profile" element={<Profile />} />
          
//           {/* Informational Pages */}
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
          
//           {/* Error Pages */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default App;






// client/src/App.js - FIXED VERSION WITH SETTINGS
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ==================== IMPORT ALL CSS FILES ====================
import './components/Header.css';
import './components/Footer.css';
import './App.css';
import './components/Home.css';
import './components/Courses.css';
import './components/CourseDetail.css';
import './components/Quiz.css';
import './components/Tools/Tools.css';
import './components/CaseStudies.css';
import './components/Statistics.css';
import './components/Dashboard/Dashboard.css';
import './components/Profile/Profile.css';
import './components/Settings/Settings.css'; // ← ADD THIS IMPORT
import './components/About.css';
import './components/Contact.css';
import './components/Error/Error.css';
import './components/Admin/AdminDashboard.css';

// ==================== IMPORT ALL COMPONENTS ====================
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Quiz from './components/Quiz';
import CaseStudies from './components/CaseStudies';
import Statistics from './components/Statistics';
import Calculator from './components/Tools/Calculator';
import Converter from './components/Tools/Converter';
import Analytics from './components/Tools/Analytics';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings'; // ← ADD THIS IMPORT
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/Error/NotFound';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';
import AdminRoute from './components/Admin/AdminRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ==================== ADMIN ROUTES ==================== */}
          {/* Admin Login - Public route (no header/footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Dashboard - Protected route (no header/footer) */}
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
          {/* ==================== MAIN PUBLIC ROUTES (with Header/Footer) ==================== */}
          <Route path="*" element={
            <MainLayout />
          } />
        </Routes>
      </div>
    </Router>
  );
}

// Separate component for main layout with header/footer
function MainLayout() {
  return (
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
          <Route path="/settings" element={<Settings />} /> {/* ← ADD THIS ROUTE */}
          
          {/* Informational Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Error Pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;