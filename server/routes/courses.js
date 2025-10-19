// routes/courses.js
const express = require('express');
const router = express.Router();

// Public course routes
router.get('/', (req, res) => {
  res.json({
    success: true,
    courses: [],
    message: 'Courses endpoint - to be implemented'
  });
});

module.exports = router;