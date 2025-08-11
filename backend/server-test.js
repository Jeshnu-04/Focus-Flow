const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authSimple = require('./auth-simple.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
});

// Use simplified auth routes for testing
app.use('/api/auth', authSimple);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => {
      console.log("✅ Test Server running on http://localhost:5000");
      console.log("✅ Test login endpoint: POST http://localhost:5000/api/auth/login");
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
