const bcrypt = require('bcryptjs');
const Member = require('../models/Member');

// Example of a member controller function
const getMembers = (req, res) => {
  // Logic for retrieving members data from the database
  // Example:
  Member.find({})
    .then((members) => {
      res.json(members);
      console.log(members);
    })
    .catch((error) => {
      console.error('Error retrieving members data:', error);
      res.status(500).json({ error: 'Error retrieving members data' });
    });
};

const getMember = (req, res) => {
  // Logic for retrieving members data from the database
  const id = req.params.id;
  console.log("Request:", req.params);
  Member.findOne({ _id: id })
    .then((member) => {
      res.json(member);
      console.log("Account Details:", member);
    })
    .catch((error) => {
      console.error('Error retrieving member data:', error);
      res.status(500).json({ error: 'Error retrieving member data' });
    });
};

const addMember = async (req, res) => {
  try {
    const data = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new member object with the hashed password
    const newMember = new Member({ ...data, password: hashedPassword });

    // Save the new member to the database
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);

  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const updateMember = async (req, res) => {
  try {

    const memberId = req.params.id;
    const updatedData = req.body;

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
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'An error occurred while updating the member' });
  }
}

const updateNotification = async (req, res) => {
  try {

    const memberId = req.params.id;
    const notification = req.body.notification;

      const member = await Member.findById(memberId);
      member.notifications.push(notification);
      await member.save();
      res.json({ message: 'Notifications updated successfully' });
    

  } catch (error) {
    console.error('Error updating notifications:', error);
    res.status(500).json({ error: 'An error occurred while updating the notifications' });
  }
}

const deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;

    await Member.deleteOne({ _id: memberId })
      .then(() => {
        res.status(200).json({ message: 'Document deleted successfully' });
      })

  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'An error occurred while deleting the member' });
  }
}

module.exports = {
  getMembers,
  getMember,
  addMember,
  updateMember,
  updateNotification,
  deleteMember,
};
