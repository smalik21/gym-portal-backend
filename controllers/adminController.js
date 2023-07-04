const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');


// Retrieve Objects from the database

const getAdmins = (req, res) => {

  Admin.find({})
    .then((admins) => {
      res.json(admins);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving admin data' });
    });
};


// Retrieve Object data from the database

const getAdmin = (req, res) => {

  // Retreive object id
  const id = req.params.id;

  Admin.findOne({ _id: id })
    .then((admin) => {
      res.json(admin);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving admin data' });
    });
};

// Create a new Object

const addAdmin = async (req, res) => {
  try {

    // Retreive new object data
    const data = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new object with the hashed password
    const newAdmin = new Admin({ ...data, password: hashedPassword });

    // Save the new object to the database
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Update the Object

const updateAdmin = async (req, res) => {
  try {

    // Retreive the object id and update data
    const adminId = req.params.id;
    const updatedData = req.body;

    // Hash Password only if received data contains a password field
    if (updatedData.password) {
      // Hash the updated password using bcrypt
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);

      // Update the password field in the updatedData object
      updatedData.password = hashedPassword;
    }

    await Admin.updateOne({ _id: adminId }, { $set: updatedData })
      .then(() => {
        res.status(200).json({ message: 'Document updated successfully' });
      });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the admin' });
  }
}

// Delete an Object

const deleteAdmin = async (req, res) => {
  try {

    // Retreive object id
    const adminId = req.params.id;

    await Admin.deleteOne({ _id: adminId })
      .then(() => {
        res.status(200).json({ message: 'Document deleted successfully' });
      })

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the admin' });
  }
}

// export all functions

module.exports = {
  getAdmins,
  getAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin
};
