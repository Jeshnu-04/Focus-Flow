const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/user.js');

dotenv.config();

async function debugLogin() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Check all users in database
    const users = await User.find({});
    console.log('\n📋 Users in database:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}, Name: ${user.name}`);
    });
    
    if (users.length === 0) {
      console.log('❌ No users found in database. Please register a user first.');
      process.exit(0);
    }
    
    // Test password comparison for first user
    const firstUser = users[0];
    console.log(`\n🔍 Testing login for: ${firstUser.email}`);
    
    // Test with a common password (you'll need to replace this with the actual password you used)
    const testPasswords = ['password', 'password123', '123456', 'admin', 'test'];
    
    for (const testPassword of testPasswords) {
      try {
        const isMatch = await bcrypt.compare(testPassword, firstUser.password);
        if (isMatch) {
          console.log(`✅ Password match found: "${testPassword}"`);
          
          // Test JWT token generation
          const jwt = require('jsonwebtoken');
          const token = jwt.sign({ id: firstUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
          console.log(`✅ JWT token generated successfully`);
          console.log(`Token preview: ${token.substring(0, 50)}...`);
          break;
        }
      } catch (err) {
        console.log(`❌ Error testing password "${testPassword}": ${err.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

debugLogin();
