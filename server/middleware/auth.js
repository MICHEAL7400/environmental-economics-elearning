// middleware/auth.js - FIXED VERSION
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const protect = async (req, res, next) => {
  try {
    let token;

    // Check for Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ecolearn-secret-key-2024');
      console.log('🔍 Decoded token:', decoded);

      // Query COMPLETE user data from MySQL database
      const [users] = await pool.query(
        `SELECT 
          id,
          first_name,
          last_name, 
          email, 
          phone, 
          country, 
          city, 
          organization, 
          role, 
          user_type, 
          bio, 
          join_date, 
          last_login, 
          is_active,
          avatar,
          created_at
        FROM users WHERE id = ?`,
        [decoded.userId]
      );

      if (!users || users.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      if (!users[0].is_active) {
        return res.status(401).json({
          success: false,
          message: 'User account is deactivated'
        });
      }

      // Attach COMPLETE user to request
      req.user = users[0];
      console.log('🔍 User attached to request:', {
        id: req.user.id,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name
      });

      next();
    } catch (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

module.exports = { protect };