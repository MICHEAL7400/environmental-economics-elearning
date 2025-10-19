// config/database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecolearn',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
});

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database connected successfully');
    console.log('📊 Database:', process.env.DB_NAME);
    console.log('🏠 Host:', process.env.DB_HOST);
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT COUNT(*) as userCount FROM users');
    console.log(`👥 Current users in database: ${rows[0].userCount}`);
    
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('💡 Check your .env file for DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
    throw error;
  }
};

// Initialize database
const initDatabase = async () => {
  try {
    console.log('🔄 Database initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

// Export both the pool and functions
module.exports = {
  pool,  // Make sure this is exported
  testConnection,
  initDatabase
};