const Package = require('../models/Package');

// Example of a Package controller function
const getPackages = (req, res) => {
  // Logic for retrieving Package data from the database
  // Example:
  Package.find({})
    .then((packages) => {
      res.json(packages);
      console.log(packages);
    })
    .catch((error) => {
      console.error('Error retrieving Package data:', error);
      res.status(500).json({ error: 'Error retrieving Package data' });
    });
};

const addPackage = async (req, res) => {
  try {
    const data = req.body;

    // Create a new member object
    const newPackage = new Package(data);

    // Save the new member to the database
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);

  } catch (error) {
    console.error('Error adding Package:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const updatePackage = async (req, res) => {
  try {

    const packageId = req.params.id;
    const updatedData = req.body;

    await Package.updateOne({ _id: packageId }, updatedData)
      .then(() => {
        res.status(200).json({ message: 'Document updated successfully' });
      })

  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ error: 'An error occurred while updating the Package' });
  }
}

const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id;

    await Package.deleteOne({ _id: packageId })
      .then(() => {
        res.status(200).json({ message: 'Document deleted successfully' });
      })

  } catch (error) {
    console.error('Error deleting Package:', error);
    res.status(500).json({ error: 'An error occurred while deleting the Package' });
  }
}

module.exports = {
  getPackages,
  addPackage,
  updatePackage,
  deletePackage
};
