// server/models/user.js - UPDATED TO MATCH YOUR DATABASE SCHEMA
const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Get user by ID
  static async findById(id) {
    try {
      const [rows] = await pool.execute(
        `SELECT 
          id, first_name, last_name, email, phone, country, city, 
          organization, role, user_type, bio, avatar, join_date, 
          last_login, is_active, created_at, updated_at 
        FROM users WHERE id = ?`,
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  // Get user by email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  // Create new user
  static async create(userData) {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        phone,
        country,
        city,
        organization,
        role,
        user_type,
        bio
      } = userData;

      const hashedPassword = await bcrypt.hash(password, 12);
      
      const [result] = await pool.execute(
        `INSERT INTO users 
         (first_name, last_name, email, password, phone, country, city, 
          organization, role, user_type, bio, join_date, last_login, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NULL, 1)`,
        [first_name, last_name, email, hashedPassword, phone, country, city, 
         organization, role, user_type, bio]
      );

      return await this.findById(result.insertId);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Update user
  static async update(id, updateData) {
    try {
      const allowedFields = [
        'first_name', 'last_name', 'email', 'phone', 'country', 'city', 
        'organization', 'role', 'user_type', 'bio', 'avatar', 'last_login', 'is_active'
      ];

      const fields = [];
      const values = [];

      Object.keys(updateData).forEach(key => {
        if (allowedFields.includes(key) && updateData[key] !== undefined) {
          fields.push(`${key} = ?`);
          values.push(updateData[key]);
        }
      });

      if (fields.length === 0) {
        throw new Error('No valid fields to update');
      }

      fields.push('updated_at = NOW()');
      
      const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
      values.push(id);

      const [result] = await pool.execute(query, values);

      if (result.affectedRows === 0) {
        throw new Error('User not found');
      }

      return await this.findById(id);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Validate password
  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Get public profile (exclude password)
  static getPublicProfile(user) {
    if (!user) return null;
    
    const { password, ...publicProfile } = user;
    return publicProfile;
  }

  // Get full name
  static getFullName(user) {
    return `${user.first_name || ''} ${user.last_name || ''}`.trim();
  }

  // Get user role (prioritize role field, fallback to user_type)
  static getRole(user) {
    return user.role || user.user_type || 'student';
  }
}

module.exports = User;