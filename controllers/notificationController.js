const Notification = require('../models/Notification');

// Example of a Notification controller function
const getNotification = (req, res) => {
  // Logic for retrieving Notification data from the database
  // Example:
  Notification.find({})
    .then((Notifications) => {
      res.json(Notifications);
      console.log(Notifications);
    })
    .catch((error) => {
      console.error('Error retrieving Notification data:', error);
      res.status(500).json({ error: 'Error retrieving Notification data' });
    });
};

const addNotification = async (req, res) => {
  try {
    const data = req.body;

    // Create a new member object
    const newNotification = new Notification(data);

    // Save the new member to the database
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);

  } catch (error) {
    console.error('Error adding Notification:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const updateNotification = async (req, res) => {
  try {

    const NotificationId = req.params.id;
    const updatedData = req.body;

    await Notification.updateOne({ _id: NotificationId }, updatedData)
      .then(() => {
        res.status(200).json({ message: 'Document updated successfully' });
      })

  } catch (error) {
    console.error('Error updating Notification:', error);
    res.status(500).json({ error: 'An error occurred while updating the Notification' });
  }
}

module.exports = {
  getNotification,
  addNotification,
  updateNotification
};
