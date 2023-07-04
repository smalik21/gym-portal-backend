const bcrypt = require('bcryptjs');
const Member = require('../models/Member');

// Retrieve Objects from the database

const getMembers = (req, res) => {

  Member.find({})
    .then((members) => {
      res.json(members);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving members data' });
    });
};

// Retrieve Object data from the database

const getMember = (req, res) => {

  // Retreive object id
  const id = req.params.id;

  Member.findOne({ _id: id })
    .then((member) => {
      res.json(member);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving member data' });
    });
};

// Create a new Object

const addMember = async (req, res) => {
  try {

    // Retreive new object data
    const data = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new object with the hashed password
    const newMember = new Member({ ...data, password: hashedPassword });

    // Save the new object to the database
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Update the Object

const updateMember = async (req, res) => {
  try {

    // Retreive the object id and update data
    const memberId = req.params.id;
    const updatedData = req.body;

    // Hash Password only if received data contains a password field
    if (updatedData.password) {
      // Hash the updated password using bcrypt
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);

      // Update the password field in the updatedData object
      updatedData.password = hashedPassword;
    }

    await Member.updateOne({ _id: memberId }, { $set: updatedData })
      .then(() => {
        res.status(200).json({ message: 'Document updated successfully' });
      });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the member' });
  }
}

// Update an Object

const updateNotification = async (req, res) => {
  try {

    // Retreive the member id and new notification
    const memberId = req.params.id;
    const notification = req.body.notification;

    // Retreive the member using member id
    const member = await Member.findById(memberId);
    // Push new Notification in the existing array
    member.notifications.push(notification);
    // Save the member
    await member.save();
    res.json({ message: 'Notifications updated successfully' });


  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the notifications' });
  }
}

// Delete an Object

const deleteMember = async (req, res) => {
  try {

    // Retreive object id
    const memberId = req.params.id;

    await Member.deleteOne({ _id: memberId })
      .then(() => {
        res.status(200).json({ message: 'Document deleted successfully' });
      })

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the member' });
  }
}

// export all functions

module.exports = {
  getMembers,
  getMember,
  addMember,
  updateMember,
  updateNotification,
  deleteMember,
};
