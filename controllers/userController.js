const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Retrieve Objects from the database

const getUsers = (req, res) => {

  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving user data' });
    });
};

// Retrieve Object data from the database

const getUser = (req, res) => {

  // Retreive object id
  const id = req.params.id;

  User.findOne({ _id: id })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving user data' });
    });
};

// Create a new Object

const addUser = async (req, res) => {
  try {

    // Retreive new object data
    const data = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new object with the hashed password
    const newUser = new User({ ...data, password: hashedPassword });

    // Save the new object to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Update the Object

const updateUser = async (req, res) => {
  try {

    // Retreive the object id and update data
    const userId = req.params.id;
    const updatedData = req.body;

    // Hash Password only if received data contains a password field
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
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
}

// Delete an Object

const deleteUser = async (req, res) => {
  try {

    // Retreive object id
    const userId = req.params.id;

    await User.deleteOne({ _id: userId })
      .then(() => {
        res.status(200).json({ message: 'Document deleted successfully' });
      })

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
}

// export all functions

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser
};
