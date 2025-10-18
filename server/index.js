const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecolearn',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Initialize database with admin user
const initializeDatabase = async () => {
    try {
        // Check if admin user exists
        const [adminUsers] = await pool.execute(
            'SELECT id FROM users WHERE email = ?', 
            ['admin@ecolearn.org']
        );

        if (adminUsers.length === 0) {
            // Create admin user
            const hashedPassword = await bcrypt.hash('admin123', 12);
            await pool.execute(
                `INSERT INTO users (first_name, last_name, email, password, user_type, country, avatar) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                ['Admin', 'User', 'admin@ecolearn.org', hashedPassword, 'admin', 'Global', '👨‍💼']
            );
            console.log('✅ Admin user created: admin@ecolearn.org / admin123');
        }

        // Create demo users
        const demoUsers = [
            {
                email: 'student@ecolearn.org',
                password: 'demo123',
                firstName: 'John',
                lastName: 'Student',
                userType: 'student',
                country: 'Kenya',
                avatar: '👨‍🎓'
            },
            {
                email: 'instructor@ecolearn.org',
                password: 'demo123',
                firstName: 'Dr. Jane',
                lastName: 'Instructor',
                userType: 'instructor',
                country: 'Nigeria',
                avatar: '👩‍🏫'
            }
        ];

        for (const user of demoUsers) {
            const [existing] = await pool.execute(
                'SELECT id FROM users WHERE email = ?', 
                [user.email]
            );

            if (existing.length === 0) {
                const hashedPassword = await bcrypt.hash(user.password, 12);
                await pool.execute(
                    `INSERT INTO users (first_name, last_name, email, password, user_type, country, avatar) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [user.firstName, user.lastName, user.email, hashedPassword, user.userType, user.country, user.avatar]
                );
                console.log(`✅ ${user.userType} user created: ${user.email} / ${user.password}`);
            }
        }
    } catch (error) {
        console.error('Database initialization error:', error);
    }
};

// Initialize database when server starts
initializeDatabase();

// JWT middleware
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const [users] = await pool.execute(
            'SELECT id, first_name, last_name, email, user_type, avatar, country FROM users WHERE id = ?', 
            [decoded.userId]
        );
        
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = users[0];
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Admin middleware
const requireAdmin = (req, res, next) => {
    if (req.user.user_type !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

// Instructor middleware
const requireInstructor = (req, res, next) => {
    if (!['admin', 'instructor'].includes(req.user.user_type)) {
        return res.status(403).json({ error: 'Instructor access required' });
    }
    next();
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, country, userType = 'student' } = req.body;

        // Validate user type
        const allowedUserTypes = ['student', 'instructor'];
        if (!allowedUserTypes.includes(userType)) {
            return res.status(400).json({ error: 'Invalid user type' });
        }

        // Check if user exists
        const [existingUsers] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const [result] = await pool.execute(
            'INSERT INTO users (first_name, last_name, email, password, country, user_type) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword, country, userType]
        );

        // Create user settings
        await pool.execute('INSERT INTO user_settings (user_id) VALUES (?)', [result.insertId]);

        // Generate token
        const token = jwt.sign(
            { userId: result.insertId },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: result.insertId,
                firstName,
                lastName,
                email,
                country,
                userType,
                avatar: '👤'
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user with all necessary fields
        const [users] = await pool.execute(
            `SELECT id, first_name, last_name, email, password, user_type, country, avatar, 
                    join_date, last_login 
             FROM users WHERE email = ? AND is_active = TRUE`,
            [email]
        );

        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = users[0];

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Update last login
        await pool.execute(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
            [user.id]
        );

        // Generate token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Prepare user data for response (exclude password)
        const userResponse = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            country: user.country,
            userType: user.user_type,
            avatar: user.avatar,
            joinDate: user.join_date,
            lastLogin: user.last_login
        };

        res.json({
            message: 'Login successful',
            token,
            user: userResponse
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
    try {
        res.json({ user: req.user });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin Routes
app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const [userStats] = await pool.execute(`
            SELECT 
                COUNT(*) as total_users,
                SUM(user_type = 'student') as total_students,
                SUM(user_type = 'instructor') as total_instructors,
                SUM(user_type = 'admin') as total_admins,
                COUNT(DISTINCT country) as countries_represented,
                DATE(join_date) as join_date,
                COUNT(*) as daily_signups
            FROM users
            WHERE join_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
            GROUP BY DATE(join_date)
            ORDER BY join_date DESC
        `);

        const [courseStats] = await pool.execute(`
            SELECT 
                COUNT(*) as total_courses,
                SUM(students_count) as total_enrollments,
                AVG(rating) as average_rating,
                SUM(is_published) as published_courses,
                SUM(NOT is_published) as draft_courses
            FROM courses
        `);

        const [recentActivity] = await pool.execute(`
            (SELECT 'user_registered' as type, first_name, last_name, email, join_date as timestamp
             FROM users 
             ORDER BY join_date DESC 
             LIMIT 5)
            UNION
            (SELECT 'course_enrolled' as type, 
                    (SELECT title FROM courses WHERE id = up.course_id) as description,
                    up.last_accessed as timestamp
             FROM user_progress up
             ORDER BY up.last_accessed DESC 
             LIMIT 5)
            ORDER BY timestamp DESC 
            LIMIT 5
        `);

        res.json({
            userStats: userStats[0] || {},
            courseStats: courseStats[0] || {},
            recentActivity,
            dailySignups: userStats
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const offset = (page - 1) * limit;

        let query = `
            SELECT 
                u.id, u.first_name, u.last_name, u.email, u.country, 
                u.user_type, u.join_date, u.last_login, u.avatar,
                COUNT(DISTINCT up.course_id) as courses_enrolled,
                SUM(up.completed) as courses_completed,
                COUNT(DISTINCT ua.id) as quizzes_taken
            FROM users u
            LEFT JOIN user_progress up ON u.id = up.user_id
            LEFT JOIN user_quiz_attempts ua ON u.id = ua.user_id
        `;

        const countQuery = `SELECT COUNT(*) as total FROM users u`;

        let whereClause = '';
        const params = [];

        if (search) {
            whereClause = ` WHERE (u.first_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        // Get total count
        const [countResult] = await pool.execute(countQuery + whereClause, params);
        const total = countResult[0].total;

        // Get users with pagination
        query += whereClause + `
            GROUP BY u.id
            ORDER BY u.join_date DESC
            LIMIT ? OFFSET ?
        `;

        params.push(parseInt(limit), offset);

        const [users] = await pool.execute(query, params);

        res.json({
            users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Admin users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user (admin only)
app.put('/api/admin/users/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        const { user_type, is_active } = req.body;

        await pool.execute(
            'UPDATE users SET user_type = ?, is_active = ? WHERE id = ?',
            [user_type, is_active, userId]
        );

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Instructor Routes
app.get('/api/instructor/courses', authenticateToken, requireInstructor, async (req, res) => {
    try {
        const instructorId = req.user.id;

        const [courses] = await pool.execute(`
            SELECT 
                c.*,
                COUNT(up.user_id) as enrolled_students,
                AVG(up.progress_percent) as average_progress,
                SUM(up.completed) as completed_students
            FROM courses c
            LEFT JOIN user_progress up ON c.id = up.course_id
            WHERE c.instructor_id = ?
            GROUP BY c.id
            ORDER BY c.created_at DESC
        `, [instructorId]);

        res.json(courses);
    } catch (error) {
        console.error('Instructor courses error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Check admin status
app.get('/api/admin/check', authenticateToken, (req, res) => {
    res.json({ 
        isAdmin: req.user.user_type === 'admin',
        isInstructor: ['admin', 'instructor'].includes(req.user.user_type)
    });
});


// ... existing imports and setup ...

// Auth Routes (already implemented above)

// Admin Routes
app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const [userStats] = await pool.execute(`
            SELECT 
                COUNT(*) as total_users,
                SUM(user_type = 'student') as total_students,
                SUM(user_type = 'instructor') as total_instructors,
                SUM(user_type = 'admin') as total_admins,
                COUNT(DISTINCT country) as countries_represented
            FROM users
            WHERE is_active = TRUE
        `);

        const [courseStats] = await pool.execute(`
            SELECT 
                COUNT(*) as total_courses,
                SUM(students_count) as total_enrollments,
                AVG(rating) as average_rating,
                SUM(is_published) as published_courses,
                SUM(NOT is_published) as draft_courses
            FROM courses
        `);

        const [recentUsers] = await pool.execute(`
            SELECT id, first_name, last_name, email, user_type, country, avatar, join_date
            FROM users 
            ORDER BY join_date DESC 
            LIMIT 5
        `);

        res.json({
            userStats: userStats[0],
            courseStats: courseStats[0],
            recentUsers
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const offset = (page - 1) * limit;

        let query = `
            SELECT 
                u.id, u.first_name, u.last_name, u.email, u.country, 
                u.user_type, u.join_date, u.last_login, u.avatar, u.is_active,
                COUNT(DISTINCT up.course_id) as courses_enrolled,
                SUM(up.completed) as courses_completed
            FROM users u
            LEFT JOIN user_progress up ON u.id = up.user_id
        `;

        const countQuery = `SELECT COUNT(*) as total FROM users u WHERE u.is_active = TRUE`;
        let whereClause = ' WHERE u.is_active = TRUE';
        const params = [];

        if (search) {
            whereClause += ` AND (u.first_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        // Get total count
        const [countResult] = await pool.execute(countQuery + (search ? whereClause.replace('WHERE u.is_active = TRUE AND', 'WHERE') : ''), params);
        const total = countResult[0].total;

        // Get users with pagination
        query += whereClause + `
            GROUP BY u.id
            ORDER BY u.join_date DESC
            LIMIT ? OFFSET ?
        `;

        params.push(parseInt(limit), offset);

        const [users] = await pool.execute(query, params);

        res.json({
            users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Admin users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/admin/users/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        const { user_type, is_active } = req.body;

        await pool.execute(
            'UPDATE users SET user_type = ?, is_active = ? WHERE id = ?',
            [user_type, is_active, userId]
        );

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/admin/courses', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const [courses] = await pool.execute(`
            SELECT 
                c.*, 
                u.first_name, u.last_name,
                COUNT(up.user_id) as enrolled_students,
                AVG(up.progress_percent) as avg_progress
            FROM courses c
            LEFT JOIN users u ON c.instructor_id = u.id
            LEFT JOIN user_progress up ON c.id = up.course_id
            GROUP BY c.id
            ORDER BY c.created_at DESC
        `);

        res.json(courses);
    } catch (error) {
        console.error('Admin courses error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/admin/courses', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { title, description, duration, level, category, instructor_id } = req.body;
        
        const [result] = await pool.execute(
            `INSERT INTO courses (title, description, duration, level, category, instructor_id, image) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, description, duration, level, category, instructor_id, '📚']
        );

        res.status(201).json({
            message: 'Course created successfully',
            courseId: result.insertId
        });
    } catch (error) {
        console.error('Create course error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/admin/courses/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const courseId = req.params.id;
        const { title, description, duration, level, category, is_published } = req.body;

        await pool.execute(
            `UPDATE courses SET title = ?, description = ?, duration = ?, level = ?, category = ?, is_published = ? 
             WHERE id = ?`,
            [title, description, duration, level, category, is_published, courseId]
        );

        res.json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('Update course error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/admin/courses/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const courseId = req.params.id;
        await pool.execute('DELETE FROM courses WHERE id = ?', [courseId]);
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Delete course error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/admin/courses/:courseId/modules', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { title, content, duration, order_index } = req.body;
        const courseId = req.params.courseId;

        const [result] = await pool.execute(
            `INSERT INTO course_modules (course_id, title, content, duration, order_index) 
             VALUES (?, ?, ?, ?, ?)`,
            [courseId, title, content, duration, order_index]
        );

        res.status(201).json({
            message: 'Module created successfully',
            moduleId: result.insertId
        });
    } catch (error) {
        console.error('Create module error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/admin/courses/:courseId/quiz', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { title, description, time_limit, passing_score, questions } = req.body;
        const courseId = req.params.courseId;

        const [quizResult] = await pool.execute(
            `INSERT INTO quizzes (course_id, title, description, time_limit, passing_score) 
             VALUES (?, ?, ?, ?, ?)`,
            [courseId, title, description, time_limit, passing_score]
        );

        const quizId = quizResult.insertId;

        // Insert questions
        for (const question of questions) {
            await pool.execute(
                `INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [quizId, question.question, question.option_a, question.option_b, question.option_c, question.option_d, question.correct_answer]
            );
        }

        res.status(201).json({
            message: 'Quiz created successfully',
            quizId
        });
    } catch (error) {
        console.error('Create quiz error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Instructor Routes
app.get('/api/instructor/courses', authenticateToken, requireInstructor, async (req, res) => {
    try {
        const instructorId = req.user.id;

        const [courses] = await pool.execute(`
            SELECT 
                c.*,
                COUNT(up.user_id) as enrolled_students,
                AVG(up.progress_percent) as average_progress,
                SUM(up.completed) as completed_students
            FROM courses c
            LEFT JOIN user_progress up ON c.id = up.course_id
            WHERE c.instructor_id = ?
            GROUP BY c.id
            ORDER BY c.created_at DESC
        `, [instructorId]);

        res.json(courses);
    } catch (error) {
        console.error('Instructor courses error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User Dashboard Route
app.get('/api/dashboard', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user info
        const [users] = await pool.execute(
            'SELECT first_name, last_name, email, country, user_type, avatar, join_date FROM users WHERE id = ?',
            [userId]
        );

        // Get user progress stats
        const [progressStats] = await pool.execute(`
            SELECT 
                COUNT(DISTINCT course_id) as courses_enrolled,
                SUM(completed) as courses_completed,
                SUM(time_spent) as total_time_spent,
                AVG(progress_percent) as average_progress
            FROM user_progress 
            WHERE user_id = ?
        `, [userId]);

        // Get recent courses
        const [recentCourses] = await pool.execute(`
            SELECT c.id, c.title, c.image, up.progress_percent, up.last_accessed
            FROM user_progress up
            JOIN courses c ON up.course_id = c.id
            WHERE up.user_id = ?
            ORDER BY up.last_accessed DESC
            LIMIT 3
        `, [userId]);

        // Get recent activity
        const [recentActivity] = await pool.execute(`
            (SELECT 'quiz_completed' as type, ua.score, ua.completed_at as timestamp, c.title
             FROM user_quiz_attempts ua
             JOIN quizzes q ON ua.quiz_id = q.id
             JOIN courses c ON q.course_id = c.id
             WHERE ua.user_id = ?
             ORDER BY ua.completed_at DESC
             LIMIT 3)
            UNION
            (SELECT 'module_completed' as type, up.progress_percent as score, up.updated_at as timestamp, c.title
             FROM user_progress up
             JOIN courses c ON up.course_id = c.id
             WHERE up.user_id = ? AND up.completed = TRUE
             ORDER BY up.updated_at DESC
             LIMIT 3)
            ORDER BY timestamp DESC
            LIMIT 5
        `, [userId, userId]);

        res.json({
            user: users[0],
            stats: progressStats[0],
            recentCourses,
            recentActivity
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Check admin status
app.get('/api/admin/check', authenticateToken, (req, res) => {
    res.json({ 
        isAdmin: req.user.user_type === 'admin',
        isInstructor: ['admin', 'instructor'].includes(req.user.user_type),
        user: req.user
    });
});

// ... rest of your existing routes (courses, quizzes, case studies, tools, etc.)


app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📧 Demo Accounts:`);
    console.log(`   Admin: admin@ecolearn.org / admin123`);
    console.log(`   Student: student@ecolearn.org / demo123`);
    console.log(`   Instructor: instructor@ecolearn.org / demo123`);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📧 Demo Accounts:`);
    console.log(`   Admin: admin@ecolearn.org / admin123`);
    console.log(`   Student: student@ecolearn.org / demo123`);
    console.log(`   Instructor: instructor@ecolearn.org / demo123`);
});