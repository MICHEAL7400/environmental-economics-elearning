// utils/initDatabase.js
const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

const initDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');

    // Create admin user with hashed password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const [adminUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      ['admin@ecolearn.org']
    );

    if (adminUsers.length === 0) {
      await pool.execute(
        `INSERT INTO users 
         (first_name, last_name, email, password, user_type, country) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        ['Admin', 'User', 'admin@ecolearn.org', hashedPassword, 'admin', 'Global']
      );
      console.log('✅ Admin user created');
    }

    // Insert sample courses if they don't exist
    const [existingCourses] = await pool.execute(
      'SELECT id FROM courses WHERE title LIKE ?',
      ['%Introduction to Environmental Economics%']
    );

    if (existingCourses.length === 0) {
      const [admin] = await pool.execute(
        'SELECT id FROM users WHERE user_type = ?',
        ['admin']
      );

      if (admin.length > 0) {
        const adminId = admin[0].id;

        await pool.execute(
          `INSERT INTO courses 
           (title, description, short_description, duration, level, category, 
            instructor_id, image, is_published, students_count, modules_count, price) 
           VALUES 
           (?, ?, ?, ?, ?, ?, ?, ?, TRUE, 150, 5, 0.00),
           (?, ?, ?, ?, ?, ?, ?, ?, TRUE, 89, 4, 49.99)`,
          [
            'Introduction to Environmental Economics',
            'Learn the fundamental concepts of environmental economics and understand why balancing economic growth with environmental protection is crucial for sustainable development.',
            'Master the basics of environmental economics',
            '4 weeks',
            'beginner',
            'Environmental Economics',
            adminId,
            '🌱',
            'Carbon Pricing and Taxes',
            'Master the mechanisms of carbon pricing, understand different tax models, and analyze their economic impacts on businesses and communities.',
            'Understand carbon pricing mechanisms',
            '6 weeks',
            'intermediate',
            'Climate Policy',
            adminId,
            '💰'
          ]
        );
        console.log('✅ Sample courses created');
      }
    }

    console.log('✅ Database initialization completed');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
};

module.exports = initDatabase;