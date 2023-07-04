const Bill = require('../models/Bill');

// Retrieve Objects from the database

const getBills = (req, res) => {

  Bill.find({})
    .then((bills) => {
      res.json(bills);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving Bill data' });
    });
};

// Retrieve Object data from the database

const getBill = (req, res) => {

  // Retreive object id
  const id = req.params.id;

  Bill.find({ memberId: id })
    .then((bills) => {
      res.json(bills);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving Bill data' });
    });
};

// Create a new Object

const addBill = async (req, res) => {
  try {

    // Retreive new object data
    const data = req.body;

    // Create a new object
    const newBill = new Bill(data);

    // Save the new object to the database
    const savedBill = await newBill.save();
    res.status(201).json(savedBill);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Update the Object

const updateBill = async (req, res) => {
  try {

    // Retreive the object id and update data
    const billId = req.params.id;
    const updatedData = req.body;


    await Bill.updateOne({ _id: billId }, updatedData)
      .then(() => {
        res.status(200).json({ message: 'Document updated successfully' });
      })

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the Bill' });
  }
}

// Delete an Object

const deleteBill = async (req, res) => {
  try {

    // Retreive object id
    const billId = req.params.id;

    await Bill.deleteOne({ _id: billId })
      .then(() => {
        res.status(200).json({ message: 'Document deleted successfully' });
      })

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the Bill' });
  }
}

// export all functions

module.exports = {
  getBills,
  getBill,
  addBill,
  updateBill,
  deleteBill
};
