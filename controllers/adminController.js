const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Example of an admin controller function
const getAdmins = (req, res) => {
  // Logic for retrieving admin data from the database
  // Example:
  Admin.find({})
    .then((admins) => {
      res.json(admins);
      console.log(admins);
    })
    .catch((error) => {
      console.error('Error retrieving admin data:', error);
      res.status(500).json({ error: 'Error retrieving admin data' });
    });
};

const getAdmin = (req, res) => {
  // Logic for retrieving members data from the database
  const id = req.params.id;
  console.log("Request:", req.params);
  Admin.findOne({ _id: id })
    .then((admin) => {
      res.json(admin);
      console.log("Account Details:", admin);
    })
    .catch((error) => {
      console.error('Error retrieving admin data:', error);
      res.status(500).json({ error: 'Error retrieving admin data' });
    });
};

const addAdmin = async (req, res) => {
  try {
    const data = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new member object with the hashed password
    const newAdmin = new Admin({ ...data, password: hashedPassword });

    // Save the new member to the database
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);

  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const updateAdmin = async (req, res) => {
  try {

    const adminId = req.params.id;
    const updatedData = req.body;

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
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'An error occurred while updating the admin' });
  }
}

const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    await Admin.deleteOne({ _id: adminId })
      .then(() => {
        res.status(200).json({ message: 'Document deleted successfully' });
      })

  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'An error occurred while deleting the admin' });
  }
}

module.exports = {
  getAdmins,
  getAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin
};
