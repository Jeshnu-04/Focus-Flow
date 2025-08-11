const express = require('express');
const router = express.Router();

// Simple test route
router.post('/login', async (req, res) => {
  console.log('🔍 Simple login test - Request received');
  console.log('📋 Request body:', req.body);
  
  try {
    // Simple response without database or JWT for now
    res.json({ 
      message: 'Login endpoint reached successfully',
      receivedData: req.body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error in simple login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
