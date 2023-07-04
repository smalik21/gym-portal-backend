const mongoose = require('mongoose');

// Define the Admin schema
const adminSchema = new mongoose.Schema({

  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  contact: {
    phone: { type: Number, required: true },
    email: { type: String }
  },
  acc_status: { type: String, required: true, default: 'active' },
  acc_type: { type: String, required: true, default: 'normal' }

});

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
