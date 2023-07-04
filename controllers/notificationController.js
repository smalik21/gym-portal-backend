const Notification = require('../models/Notification');

// Retrieve Object data from the database

const getNotification = (req, res) => {

  Notification.find({})
    .then((Notifications) => {
      res.json(Notifications);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving Notification data' });
    });
};

// Create a new Object

const addNotification = async (req, res) => {
  try {
    const data = req.body;

    const newNotification = new Notification(data);

    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Update the Object

const updateNotification = async (req, res) => {
  try {

    const NotificationId = req.params.id;
    const updatedData = req.body;

    await Notification.updateOne({ _id: NotificationId }, updatedData)
      .then(() => {
        res.status(200).json({ message: 'Document updated successfully' });
      })

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the Notification' });
  }
}

// export all functions

module.exports = {
  getNotification,
  addNotification,
  updateNotification
};
