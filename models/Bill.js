const mongoose = require('mongoose');

// Define the Bill schema
const billSchema = new mongoose.Schema({
  memberId: { type: String, required: true },
  memberName: { type: String, required: true },
  monthlyAmt: { type: Number, required: true },
  extraAmt: { type: Number },
  totalAmt: { type: Number, required: true },
  status: { type: String, required: true, default: 'pending' }

});

// Create the Bill model
const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
