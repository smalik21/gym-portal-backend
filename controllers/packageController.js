const Package = require('../models/Package');

// Retrieve Objects from the database

const getPackages = (req, res) => {

  Package.find({})
    .then((packages) => {
      res.json(packages);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving Package data' });
    });
};

// Create a new Object

const addPackage = async (req, res) => {
  try {

    const data = req.body;

    const newPackage = new Package(data);

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Update the Object

const updatePackage = async (req, res) => {
  try {

    const packageId = req.params.id;
    const updatedData = req.body;

    await Package.updateOne({ _id: packageId }, updatedData)
      .then(() => {
        res.status(200).json({ message: 'Document updated successfully' });
      })

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the Package' });
  }
}

// Delete an Object

const deletePackage = async (req, res) => {
  try {

    const packageId = req.params.id;

    await Package.deleteOne({ _id: packageId })
      .then(() => {
        res.status(200).json({ message: 'Document deleted successfully' });
      })

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the Package' });
  }
}

// export all functions

module.exports = {
  getPackages,
  addPackage,
  updatePackage,
  deletePackage
};
