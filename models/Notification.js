const mongoose = require('mongoose');

// Define the Notification schema
const notificationSchema = new mongoose.Schema({
  customMessage: { type: String, required: true },
  paymentReminder: { type: String, required: true },

});

// Create the Notification model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
