// controllers/progressController.js
const { pool } = require('../config/database');

// Get user progress for a course
const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const [progress] = await pool.execute(
      `SELECT * FROM user_progress 
       WHERE user_id = ? AND course_id = ?`,
      [userId, courseId]
    );

    if (progress.length === 0) {
      return res.status(200).json({
        success: true,
        data: null,
        message: 'No progress found for this course'
      });
    }

    res.status(200).json({
      success: true,
      data: progress[0]
    });

  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching progress'
    });
  }
};

// Update module progress
const updateModuleProgress = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const userId = req.user.id;

    // Check if progress exists
    const [existingProgress] = await pool.execute(
      `SELECT * FROM user_progress 
       WHERE user_id = ? AND course_id = ?`,
      [userId, courseId]
    );

    if (existingProgress.length === 0) {
      // Create new progress record
      await pool.execute(
        `INSERT INTO user_progress 
         (user_id, course_id, module_id, progress_percent, last_accessed) 
         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [userId, courseId, moduleId, 0]
      );
    } else {
      // Update existing progress
      await pool.execute(
        `UPDATE user_progress 
         SET module_id = ?, last_accessed = CURRENT_TIMESTAMP 
         WHERE user_id = ? AND course_id = ?`,
        [moduleId, userId, courseId]
      );
    }

    // Calculate overall progress
    const [modules] = await pool.execute(
      'SELECT COUNT(*) as total FROM course_modules WHERE course_id = ?',
      [courseId]
    );

    const [completedModules] = await pool.execute(
      `SELECT COUNT(DISTINCT module_id) as completed 
       FROM user_progress 
       WHERE user_id = ? AND course_id = ? AND module_id IS NOT NULL`,
      [userId, courseId]
    );

    const progressPercent = Math.round(
      (completedModules[0].completed / modules[0].total) * 100
    );

    // Update progress percent
    await pool.execute(
      `UPDATE user_progress 
       SET progress_percent = ? 
       WHERE user_id = ? AND course_id = ?`,
      [progressPercent, userId, courseId]
    );

    // Check if course is completed
    if (progressPercent === 100) {
      await pool.execute(
        `UPDATE user_progress 
         SET completed = TRUE, completed_at = CURRENT_TIMESTAMP 
         WHERE user_id = ? AND course_id = ?`,
        [userId, courseId]
      );
    }

    const [updatedProgress] = await pool.execute(
      `SELECT * FROM user_progress 
       WHERE user_id = ? AND course_id = ?`,
      [userId, courseId]
    );

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      data: updatedProgress[0]
    });

  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating progress'
    });
  }
};

// Get user's enrolled courses
const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const [courses] = await pool.execute(
      `SELECT 
        c.*,
        up.progress_percent,
        up.completed,
        up.last_accessed,
        u.first_name,
        u.last_name,
        u.avatar as instructor_avatar
       FROM user_progress up
       JOIN courses c ON up.course_id = c.id
       JOIN users u ON c.instructor_id = u.id
       WHERE up.user_id = ?
       ORDER BY up.last_accessed DESC`,
      [userId]
    );

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });

  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enrolled courses'
    });
  }
};

module.exports = {
  getCourseProgress,
  updateModuleProgress,
  getEnrolledCourses
};