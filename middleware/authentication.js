const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Member = require('../models/Member');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {

  const { accountType, username, password } = req.body;

  try {
    let foundUser = null;

    // Check the account type and find the corresponding user in the database
    if (accountType === 'Admin') {
      foundUser = await Admin.findOne({ username });
    } else if (accountType === 'Member') {
      foundUser = await Member.findOne({ username });
    } else {
      foundUser = await User.findOne({ username });
    }


    if (!foundUser) {
      // If the user is not found, return an error response
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the entered password with the stored hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      // If the password is not valid, return an error response
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Return a success response with the authenticated user's information
    return res.json({
      isAuthenticated: true,
      accountId: foundUser._id,
      accountType: foundUser.acc_type || '',
    });
  } catch (error) {
    // Return an error response if an exception occurs during the login process
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

module.exports = router;
