// controllers/courseController.js
const { pool } = require('../config/database');

// Get all courses
const getCourses = async (req, res) => {
  try {
    const {
      category,
      level,
      search,
      page = 1,
      limit = 10,
      featured
    } = req.query;

    let query = `
      SELECT 
        c.*,
        u.first_name,
        u.last_name,
        u.avatar as instructor_avatar,
        COUNT(DISTINCT cm.id) as modules_count,
        COUNT(DISTINCT up.user_id) as enrolled_students
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN course_modules cm ON c.id = cm.course_id
      LEFT JOIN user_progress up ON c.id = up.course_id
      WHERE c.is_published = true
    `;

    const params = [];

    if (category && category !== 'all') {
      query += ' AND c.category = ?';
      params.push(category);
    }

    if (level && level !== 'all') {
      query += ' AND c.level = ?';
      params.push(level);
    }

    if (featured === 'true') {
      query += ' AND c.is_featured = true';
    }

    if (search) {
      query += ' AND (c.title LIKE ? OR c.description LIKE ? OR c.tags LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' GROUP BY c.id ORDER BY c.created_at DESC';

    // Add pagination
    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [courses] = await pool.execute(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM courses WHERE is_published = true';
    const countParams = [];

    if (category && category !== 'all') {
      countQuery += ' AND category = ?';
      countParams.push(category);
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: courses
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses'
    });
  }
};

// Get single course
const getCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const [courses] = await pool.execute(
      `SELECT 
        c.*,
        u.first_name,
        u.last_name,
        u.avatar as instructor_avatar,
        u.bio as instructor_bio,
        COUNT(DISTINCT cm.id) as modules_count
       FROM courses c
       LEFT JOIN users u ON c.instructor_id = u.id
       LEFT JOIN course_modules cm ON c.id = cm.course_id
       WHERE c.id = ? AND c.is_published = true
       GROUP BY c.id`,
      [id]
    );

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const course = courses[0];

    // Get course modules
    const [modules] = await pool.execute(
      `SELECT * FROM course_modules 
       WHERE course_id = ? 
       ORDER BY order_index ASC`,
      [id]
    );

    // Get course resources count
    for (let module of modules) {
      const [resources] = await pool.execute(
        'SELECT COUNT(*) as count FROM module_resources WHERE module_id = ?',
        [module.id]
      );
      module.resources_count = resources[0].count;
    }

    course.modules = modules;

    res.status(200).json({
      success: true,
      data: course
    });

  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course'
    });
  }
};

// Get course categories
const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.execute(
      'SELECT * FROM course_categories WHERE is_active = true ORDER BY name ASC'
    );

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    });
  }
};

module.exports = {
  getCourses,
  getCourse,
  getCategories
};