const mongoose = require('mongoose');

// Define the Member schema
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  contact: {
    phone: { type: Number, required: true },
    email: { type: String }
  },
  age: { type: Number },
  acc_status: { type: String, required: true, default: 'active' },
  package_type: {
    name: { type: String },
    amt: { type: Number, required: true }
  },
  payment_status: { type: String, default: 'pending' },
  joining_date: { type: String },
  notifications: { type: Array, default: [] }

});

// Create the Member model
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;