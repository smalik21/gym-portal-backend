const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  contact: {
    phone: { type: Number, required: true },
    email: { type: String }
  },
  acc_status: { type: String, required: true, default: 'active' }

});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
