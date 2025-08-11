const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
});

// Simple test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Try to connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => {
      console.log("✅ Server running on http://localhost:5000");
      console.log("✅ Test endpoint: http://localhost:5000/test");
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
