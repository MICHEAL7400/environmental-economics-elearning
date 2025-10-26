// server/routes/courses.js
const express = require('express');
const { pool } = require('../config/database');

const router = express.Router();

console.log('🔍 Courses routes file loaded');

// GET all courses
router.get('/', async (req, res) => {
  try {
    console.log('📚 Fetching all courses from database...');
    
    const [courses] = await pool.execute(`
      SELECT 
        id,
        title,
        description,
        short_description,
        duration,
        level,
        category,
        instructor_id,
        image,
        thumbnail,
        video_preview,
        rating,
        students_count,
        modules_count,
        price,
        discount_price,
        is_featured,
        is_published,
        language,
        requirements,
        learning_outcomes,
        tags,
        created_at,
        updated_at
      FROM courses 
      WHERE is_published = 1
      ORDER BY created_at DESC
    `);

    console.log(`✅ Found ${courses.length} published courses`);

    // Format the courses for frontend
    const formattedCourses = courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description || course.short_description,
      duration: course.duration || 'Not specified',
      level: course.level ? course.level.charAt(0).toUpperCase() + course.level.slice(1) : 'Beginner',
      category: course.category || 'general',
      students: course.students_count || 0,
      rating: course.rating || 0,
      image: course.image || course.thumbnail || '📚', // Fallback emoji
      is_featured: course.is_featured || false,
      price: course.price || 0,
      discount_price: course.discount_price,
      modules_count: course.modules_count || 0,
      language: course.language || 'English'
    }));

    res.status(200).json(formattedCourses);

  } catch (error) {
    console.error('❌ Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses from database',
      error: error.message
    });
  }
});

// GET single course by ID
router.get('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log(`📖 Fetching course ${courseId} from database...`);

    const [courses] = await pool.execute(`
      SELECT 
        id,
        title,
        description,
        short_description,
        duration,
        level,
        category,
        instructor_id,
        image,
        thumbnail,
        video_preview,
        rating,
        students_count,
        modules_count,
        price,
        discount_price,
        is_featured,
        is_published,
        language,
        requirements,
        learning_outcomes,
        tags,
        created_at,
        updated_at
      FROM courses 
      WHERE id = ? AND is_published = 1
    `, [courseId]);

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const course = courses[0];
    
    // Format the course for frontend
    const formattedCourse = {
      id: course.id,
      title: course.title,
      description: course.description,
      short_description: course.short_description,
      duration: course.duration,
      level: course.level ? course.level.charAt(0).toUpperCase() + course.level.slice(1) : 'Beginner',
      category: course.category,
      instructor_id: course.instructor_id,
      image: course.image || course.thumbnail || '📚',
      video_preview: course.video_preview,
      rating: course.rating,
      students_count: course.students_count,
      modules_count: course.modules_count,
      price: course.price,
      discount_price: course.discount_price,
      is_featured: course.is_featured,
      language: course.language,
      requirements: course.requirements,
      learning_outcomes: course.learning_outcomes ? JSON.parse(course.learning_outcomes) : [],
      tags: course.tags ? JSON.parse(course.tags) : [],
      created_at: course.created_at
    };

    res.status(200).json(formattedCourse);

  } catch (error) {
    console.error('❌ Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course from database',
      error: error.message
    });
  }
});

module.exports = router;