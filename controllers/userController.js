const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Example of a user controller function
const getUsers = (req, res) => {
  // Logic for retrieving user data from the database
  // Example:
  User.find({})
    .then((users) => {
      res.json(users);
      console.log(users);
    })
    .catch((error) => {
      console.error('Error retrieving user data:', error);
      res.status(500).json({ error: 'Error retrieving user data' });
    });
};

const getUser = (req, res) => {
  // Logic for retrieving members data from the database
  const id = req.params.id;
  console.log("Request:", req.params);
  User.findOne({ _id: id })
    .then((user) => {
      res.json(user);
      console.log("Account Details:", user);
    })
    .catch((error) => {
      console.error('Error retrieving user data:', error);
      res.status(500).json({ error: 'Error retrieving user data' });
    });
};

const addUser = async (req, res) => {
  try {
    const data = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new member object with the hashed password
    const newUser = new User({ ...data, password: hashedPassword });

    // Save the new member to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const updateUser = async (req, res) => {
  try {

    const userId = req.params.id;
    const updatedData = req.body;

    if (updatedData.password) {
      // Hash the updated password using bcrypt
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);

      // Update the password field in the updatedData object
      updatedData.password = hashedPassword;
    }

    await User.updateOne({ _id: userId }, { $set: updatedData })
      .then(() => {
        res.status(200).json({ message: 'Document updated successfully' });
      });

  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.deleteOne({ _id: userId })
      .then(() => {
        res.status(200).json({ message: 'Document deleted successfully' });
      })

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser
};
