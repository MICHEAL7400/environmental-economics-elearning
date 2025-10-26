// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection, initDatabase } = require('./config/database');

// Route imports
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const caseStudyRoutes = require('./routes/caseStudies');
const progressRoutes = require('./routes/progress');

const app = express();

// =========================
// 🌍 CORS configuration
// =========================
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// =========================
// 🧠 Body parsing middleware
// =========================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// =========================
// 🗄️ Initialize database and start server
// =========================
const initializeApp = async () => {
  try {
    await testConnection();
    await initDatabase();

    console.log('🔍 Mounting routes...');

    // =========================
    // 🚦 Routes
    // =========================
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/courses', courseRoutes);
    app.use('/api/progress', progressRoutes);
    app.use('/api/case-studies', caseStudyRoutes);

    // =========================
    // 💓 Health check route
    // =========================
    app.get('/api/health', (req, res) => {
      res.status(200).json({
        success: true,
        message: 'EcoLearn API is running successfully',
        timestamp: new Date().toISOString(),
        database: 'Connected'
      });
    });

    // =========================
    // ❌ 404 handler
    // =========================
    app.use('*', (req, res) => {
      console.log(`❌ 404: Route not found: ${req.method} ${req.originalUrl}`);
      res.status(404).json({
        success: false,
        message: 'Route not found: ' + req.originalUrl
      });
    });

    // =========================
    // ⚠️ Global error handler
    // =========================
    app.use((error, req, res, next) => {
      console.error('❌ Error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    });

    // =========================
    // 🚀 Start server
    // =========================
    const PORT = process.env.PORT || 5000;
    const ENV = process.env.NODE_ENV || 'development';

    console.log('✅ .env variables loaded correctly');

    app.listen(PORT, () => {
      console.log(`✅ Express server started on port ${PORT}`);
      console.log(`✅ Environment mode is ${ENV}`);
      console.log('✅ Health check endpoint is live:');
      console.log(`👉 http://localhost:${PORT}/api/health`);
      console.log('✅ Test auth endpoint:');
      console.log(`👉 http://localhost:${PORT}/api/auth/test`);
    });

  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    process.exit(1);
  }
};

initializeApp();

module.exports = app;