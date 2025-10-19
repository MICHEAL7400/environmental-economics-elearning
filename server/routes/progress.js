// routes/progress.js
const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Protected progress routes
router.get('/', protect, (req, res) => {
  res.json({
    success: true,
    progress: [],
    message: 'Progress endpoint - to be implemented'
  });
});

module.exports = router;