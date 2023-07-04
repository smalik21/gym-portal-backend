const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Member = require('../models/Member');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {

    const { accountType, username, password } = req.body;
    console.log("Login Credentials:", accountType, username, password);
  
    try {
      let foundUser = null;
  
      if (accountType === 'Admin') {
        foundUser = await Admin.findOne({ username });
      } else if (accountType === 'Member') {
        foundUser = await Member.findOne({ username });
      } else {
        foundUser = await User.findOne({ username });
      }

      console.log("found user:", foundUser);
  
      if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      
      // Compare the entered password with the stored hashed password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      console.log(`Found ${accountType}:`, foundUser);
      return res.json({
        isAuthenticated: true,
        accountId: foundUser._id,
        accountType: foundUser.acc_type || '',
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred during login' });
    }
  });

module.exports = router;
