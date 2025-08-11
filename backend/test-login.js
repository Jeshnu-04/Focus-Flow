const axios = require('axios');

async function testLogin() {
  try {
    console.log('Testing login functionality...');
    
    // Test with sample credentials - replace with actual user data from your DB
    const loginData = {
      email: 'test@example.com', // Replace with actual email from your DB
      password: 'password123'    // Replace with actual password you used during registration
    };
    
    const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
    
    console.log('✅ Login successful!');
    console.log('Response:', response.data);
    console.log('Token received:', response.data.token ? 'Yes' : 'No');
    
  } catch (error) {
    console.error('❌ Login failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data.message);
    } else {
      console.error('Error:', error.message);
    }
  }
}

async function testGuestLogin() {
  try {
    console.log('\nTesting guest login...');
    
    const response = await axios.post('http://localhost:5000/api/auth/guest');
    
    console.log('✅ Guest login successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('❌ Guest login failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data.message);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run tests
testLogin();
testGuestLogin();
