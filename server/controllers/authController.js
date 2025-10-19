// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database').pool;

const register = async (req, res) => {
  console.log('🎯 === REGISTER CONTROLLER STARTED ===');
  console.log('📨 Request body:', req.body);
  
  const connection = await pool.getConnection();
  console.log('🔗 Database connection acquired');
  
  try {
    await connection.beginTransaction();
    console.log('🔄 Transaction started');

    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      role = 'student',
      country,
      organization
    } = req.body;

    console.log('📝 Processing registration for:', email);

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: firstName, lastName, email, password'
      });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate password length
    if (password.length < 6) {
      console.log('❌ Password too short');
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    console.log('🔍 Checking if user exists...');
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      console.log('❌ User already exists:', email);
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    console.log('✅ User does not exist, proceeding...');

    // Hash password
    console.log('🔐 Hashing password...');
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('✅ Password hashed');

    // Insert new user
    console.log('💾 Inserting user into database...');
    const insertQuery = `INSERT INTO users (
      first_name, 
      last_name, 
      email, 
      password, 
      country, 
      organization, 
      role,
      user_type,
      is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const insertValues = [
      firstName.trim(),
      lastName.trim(),
      email.toLowerCase().trim(),
      hashedPassword,
      country || null,
      organization || null,
      role || 'student',
      role || 'student',
      true
    ];

    console.log('📊 Insert query:', insertQuery);
    console.log('📊 Insert values:', insertValues);

    const [result] = await connection.execute(insertQuery, insertValues);

    console.log('✅ User inserted with ID:', result.insertId);
    console.log('✅ Insert result:', result);

    // Get the newly created user
    console.log('🔍 Retrieving created user...');
    const [newUser] = await connection.execute(
      `SELECT 
        id, 
        first_name as firstName,
        last_name as lastName, 
        email, 
        role,
        user_type as userType,
        country,
        organization,
        avatar,
        created_at as createdAt
      FROM users WHERE id = ?`,
      [result.insertId]
    );

    console.log('✅ Retrieved user:', newUser[0]);

    if (!newUser[0]) {
      throw new Error('Failed to retrieve created user');
    }

    // Generate JWT token
    console.log('🔑 Generating JWT token...');
    const token = jwt.sign(
      { 
        userId: newUser[0].id,
        email: newUser[0].email,
        role: newUser[0].role
      },
      process.env.JWT_SECRET || 'ecolearn-secret-key-2024',
      { expiresIn: '30d' }
    );

    // Create default user settings
    console.log('⚙️ Creating user settings...');
    await connection.execute(
      `INSERT INTO user_settings (user_id) VALUES (?)`,
      [result.insertId]
    );

    await connection.commit();
    console.log('✅ Transaction committed');

    console.log('🎉 === REGISTRATION COMPLETED SUCCESSFULLY ===');
    console.log('👤 User:', newUser[0].email);
    console.log('🆔 User ID:', newUser[0].id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser[0].id,
        firstName: newUser[0].firstName,
        lastName: newUser[0].lastName,
        email: newUser[0].email,
        role: newUser[0].role,
        userType: newUser[0].userType,
        country: newUser[0].country,
        organization: newUser[0].organization,
        avatar: newUser[0].avatar,
        createdAt: newUser[0].createdAt
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('❌ === REGISTRATION FAILED ===');
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
    console.log('🔗 Database connection released');
    console.log('🎯 === REGISTER CONTROLLER ENDED ===\n');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const [users] = await pool.execute(
      `SELECT 
        id,
        first_name as firstName,
        last_name as lastName,
        email,
        password,
        role,
        user_type as userType,
        country,
        organization,
        avatar,
        is_active,
        last_login,
        created_at as createdAt
      FROM users WHERE email = ?`,
      [email.toLowerCase().trim()]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    await pool.execute(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'ecolearn-secret-key-2024',
      { expiresIn: '30d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const [users] = await pool.execute(
      `SELECT 
        id,
        first_name as firstName,
        last_name as lastName,
        email,
        role,
        user_type as userType,
        country,
        organization,
        avatar,
        created_at as createdAt,
        last_login as lastLogin
      FROM users WHERE id = ?`,
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: users[0]
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user data'
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser
};