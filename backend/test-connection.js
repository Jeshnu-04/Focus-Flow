const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('Testing MongoDB Atlas connection...');
console.log('Connection string (masked):', process.env.MONGO_URI?.replace(/\/\/.*@/, '//***:***@'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas Connected Successfully!');
    console.log('Database name:', mongoose.connection.db.databaseName);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB Atlas Connection Failed:');
    console.error(err.message);
    process.exit(1);
  });
