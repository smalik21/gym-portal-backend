const mongoose = require('mongoose');

// Define the Package schema
const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagLine: { type: String },
  price: { type: Number, required: true },
  features: { type: Array, default: [] },

});

// Create the Package model
const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
