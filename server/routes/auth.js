// routes/auth.js
const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Add console log to verify this file is loaded
console.log('🔍 Auth routes file loaded');

// Test route to verify router is working
router.get('/test', (req, res) => {
  console.log('✅ /api/auth/test route hit');
  res.json({ 
    success: true,
    message: 'Auth router is working!' 
  });
});

// Auth routes
router.post('/register', (req, res) => {
  console.log('✅ /api/auth/register route hit');
  // Call the actual register function
  register(req, res);
});

router.post('/login', login);
router.get('/me', protect, getCurrentUser);

module.exports = router;