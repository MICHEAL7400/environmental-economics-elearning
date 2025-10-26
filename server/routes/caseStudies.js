// server/routes/caseStudies.js
const express = require('express');
const { pool } = require('../config/database');

const router = express.Router();

console.log('✅ Case Studies routes loaded');

// GET all published case studies
router.get('/', async (req, res) => {
  try {
    console.log('📚 Fetching case studies from database...');
    
    const [caseStudies] = await pool.execute(`
      SELECT 
        id,
        title,
        country,
        sector,
        year,
        image,
        summary,
        key_metrics,
        tags,
        is_featured,
        view_count,
        download_count,
        created_at
      FROM case_studies 
      WHERE is_published = 1
      ORDER BY created_at DESC
    `);

    console.log(`✅ Found ${caseStudies.length} published case studies`);

    // Format the case studies for frontend
    const formattedStudies = caseStudies.map(study => {
      // Parse JSON fields safely
      let key_metrics = {};
      let tags = [];
      
      try {
        key_metrics = study.key_metrics ? JSON.parse(study.key_metrics) : {};
      } catch (e) {
        console.warn(`Invalid key_metrics for study ${study.id}:`, e.message);
      }
      
      try {
        tags = study.tags ? JSON.parse(study.tags) : [];
      } catch (e) {
        console.warn(`Invalid tags for study ${study.id}:`, e.message);
      }

      return {
        id: study.id,
        title: study.title,
        country: study.country,
        sector: study.sector,
        year: study.year,
        image: study.image || '📊',
        summary: study.summary,
        key_metrics: key_metrics,
        tags: tags,
        is_featured: study.is_featured || false,
        view_count: study.view_count || 0,
        download_count: study.download_count || 0,
        created_at: study.created_at
      };
    });

    res.status(200).json(formattedStudies);

  } catch (error) {
    console.error('❌ Database error fetching case studies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching case studies from database',
      error: error.message
    });
  }
});

// GET single case study by ID
router.get('/:id', async (req, res) => {
  try {
    const studyId = req.params.id;
    console.log(`📖 Fetching case study ${studyId} from database...`);

    // Increment view count
    await pool.execute(
      'UPDATE case_studies SET view_count = view_count + 1 WHERE id = ?',
      [studyId]
    );

    const [studies] = await pool.execute(`
      SELECT 
        id,
        title,
        country,
        sector,
        year,
        image,
        summary,
        full_content,
        key_metrics,
        tags,
        author_id,
        is_featured,
        view_count,
        download_count,
        created_at
      FROM case_studies 
      WHERE id = ? AND is_published = 1
    `, [studyId]);

    if (studies.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found'
      });
    }

    const study = studies[0];
    
    // Parse JSON fields
    let key_metrics = {};
    let tags = [];
    let full_content = {};
    
    try {
      key_metrics = study.key_metrics ? JSON.parse(study.key_metrics) : {};
      tags = study.tags ? JSON.parse(study.tags) : [];
      full_content = study.full_content ? JSON.parse(study.full_content) : {};
    } catch (e) {
      console.warn('JSON parsing error:', e.message);
    }

    const formattedStudy = {
      id: study.id,
      title: study.title,
      country: study.country,
      sector: study.sector,
      year: study.year,
      image: study.image,
      summary: study.summary,
      full_content: full_content,
      key_metrics: key_metrics,
      tags: tags,
      author_id: study.author_id,
      is_featured: study.is_featured,
      view_count: study.view_count,
      download_count: study.download_count,
      created_at: study.created_at
    };

    res.status(200).json(formattedStudy);

  } catch (error) {
    console.error('❌ Error fetching case study:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching case study from database',
      error: error.message
    });
  }
});

module.exports = router;