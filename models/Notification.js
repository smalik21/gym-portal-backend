const mongoose = require('mongoose');

// Define the Package schema
const notificationSchema = new mongoose.Schema({
  customMessage: { type: String, required: true },
  paymentReminder: { type: String, required: true },
  
  // Other Package fields
});

// Create the Package model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
