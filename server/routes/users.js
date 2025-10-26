// server/routes/users.js - UPDATED FOR YOUR DATABASE SCHEMA
const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router();

console.log('🔍 Users routes file loaded');

// =========================
// 🧪 TEST ROUTES
// =========================
router.get('/test', (req, res) => {
  console.log('✅ /api/users/test route hit');
  res.json({ 
    success: true,
    message: 'Users router is working!',
    timestamp: new Date().toISOString()
  });
});

// Test protected route
router.get('/test-protected', protect, (req, res) => {
  console.log('✅ /api/users/test-protected route hit by user:', req.user.email);
  res.json({ 
    success: true,
    message: 'Protected users route is working!',
    user: {
      id: req.user.id,
      email: req.user.email,
      name: User.getFullName(req.user),
      role: User.getRole(req.user)
    }
  });
});

// =========================
// 👤 PROFILE ROUTES
// =========================

// GET user profile
router.get('/profile', protect, async (req, res) => {
  try {
    console.log('📋 GET /api/users/profile - Fetching user profile for:', req.user.email);
    
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('✅ Profile fetched successfully for:', user.email);
    
    res.status(200).json({
      success: true,
      user: user
    });

  } catch (error) {
    console.error('❌ Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

// UPDATE user profile - CORRECTED FOR YOUR SCHEMA
router.put('/profile', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      first_name,
      last_name,
      email,
      phone,
      country,
      city,
      organization,
      role,
      bio
    } = req.body;

    console.log('📝 PUT /api/users/profile - Updating profile for user:', userId);
    console.log('📦 Update data received:', req.body);

    // Check if email is being changed and if it's already taken
    if (email && email !== req.user.email) {
      const existingUser = await User.findByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    // Prepare update data - ONLY fields that exist in your database
    const updateData = {};
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (country !== undefined) updateData.country = country;
    if (city !== undefined) updateData.city = city;
    if (organization !== undefined) updateData.organization = organization;
    if (role !== undefined) updateData.role = role;
    if (bio !== undefined) updateData.bio = bio;

    console.log('🔄 Updating user with data:', updateData);

    // Update user
    const updatedUser = await User.update(userId, updateData);

    console.log('✅ Profile updated successfully for user:', updatedUser.email);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
});

// =========================
// 📊 LEARNING STATS (Using mock data since fields don't exist in DB)
// =========================

// GET learning stats
router.get('/learning-stats', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log('📊 GET /api/users/learning-stats for user:', userId);

    // Since your database doesn't have these fields, use mock data
    // You can add these fields to your database later
    const mockStats = {
      total_hours: 45,
      courses_completed: 3,
      current_streak: 7,
      points: 1250,
      rank: 'Environmental Explorer'
    };

    console.log('✅ Learning stats retrieved (mock data):', mockStats);

    res.status(200).json({
      success: true,
      ...mockStats
    });

  } catch (error) {
    console.error('❌ Learning stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching learning stats',
      error: error.message
    });
  }
});

// =========================
// 🏆 CERTIFICATES (Mock data)
// =========================

// GET certificates
router.get('/certificates', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log('🏆 GET /api/users/certificates for user:', userId);

    // Mock data for testing
    const mockCertificates = [
      {
        id: 1,
        course_name: 'Introduction to Environmental Economics',
        completion_date: new Date('2024-02-15'),
        score: 95,
        download_url: '#'
      },
      {
        id: 2,
        course_name: 'Carbon Pricing Fundamentals',
        completion_date: new Date('2024-03-01'),
        score: 88,
        download_url: '#'
      }
    ];

    res.status(200).json({
      success: true,
      certificates: mockCertificates
    });

  } catch (error) {
    console.error('❌ Certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching certificates',
      error: error.message
    });
  }
});

// =========================
// 📚 COURSE PROGRESS (Mock data)
// =========================

// GET course progress
router.get('/course-progress', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log('📚 GET /api/users/course-progress for user:', userId);

    // Mock data for testing
    const mockProgress = [
      {
        course_id: 1,
        course_name: 'Introduction to Environmental Economics',
        progress_percentage: 85,
        last_activity: new Date('2024-03-20'),
        total_modules: 10,
        completed_modules: 8
      },
      {
        course_id: 2,
        course_name: 'Carbon Pricing and Taxes',
        progress_percentage: 45,
        last_activity: new Date('2024-03-18'),
        total_modules: 8,
        completed_modules: 3
      }
    ];

    res.status(200).json({
      success: true,
      progress: mockProgress
    });

  } catch (error) {
    console.error('❌ Course progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course progress',
      error: error.message
    });
  }
});

// =========================
// 🖼️ AVATAR UPLOAD (Using 'avatar' field from your DB)
// =========================

// UPLOAD avatar
router.post('/upload-avatar', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log('🖼️ POST /api/users/upload-avatar for user:', userId);

    // Generate avatar URL or emoji - using 'avatar' field from your DB
    const avatarEmoji = '👤'; // You can make this dynamic

    // Update user's avatar in database (using the 'avatar' field)
    await User.update(userId, { avatar: avatarEmoji });

    console.log('✅ Avatar updated:', avatarEmoji);

    res.status(200).json({
      success: true,
      avatar: avatarEmoji,
      message: 'Avatar updated successfully'
    });

  } catch (error) {
    console.error('❌ Avatar upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading avatar',
      error: error.message
    });
  }
});

// =========================
// 📥 CERTIFICATE DOWNLOAD
// =========================

// DOWNLOAD certificate
router.get('/certificates/:id/download', protect, async (req, res) => {
  try {
    const certificateId = req.params.id;
    const userId = req.user.id;
    
    console.log('📥 GET /api/users/certificates/download for cert:', certificateId, 'user:', userId);

    res.status(200).json({
      success: true,
      message: 'Certificate download initiated',
      certificateId: certificateId,
      downloadUrl: `http://localhost:5000/api/certificates/${certificateId}/file.pdf`
    });

  } catch (error) {
    console.error('❌ Certificate download error:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading certificate',
      error: error.message
    });
  }
});

module.exports = router;
