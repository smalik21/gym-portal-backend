const Bill = require('../models/Bill');

// Example of a Bill controller function
const getBills = (req, res) => {
  // Logic for retrieving Bill data from the database
  // Example:
  Bill.find({})
    .then((bills) => {
      res.json(bills);
      console.log(bills);
    })
    .catch((error) => {
      console.error('Error retrieving Bill data:', error);
      res.status(500).json({ error: 'Error retrieving Bill data' });
    });
};

const getBill = (req, res) => {
  // Logic for retrieving Bill data from the database
  // Example:
  const id = req.params.id;

  Bill.find({ memberId: id})
    .then((bills) => {
      res.json(bills);
      console.log(bills);
    })
    .catch((error) => {
      console.error('Error retrieving Bill data:', error);
      res.status(500).json({ error: 'Error retrieving Bill data' });
    });
};

const addBill = async (req, res) => {
  try {
    const data = req.body;

    // Create a new member object
    const newBill = new Bill(data);

    // Save the new member to the database
    const savedBill = await newBill.save();
    res.status(201).json(savedBill);

  } catch (error) {
    console.error('Error adding Bill:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const updateBill = async (req, res) => {
  try {

    const billId = req.params.id;
    const updatedData = req.body;
    console.log("Updated", updatedData);

    await Bill.updateOne({ _id: billId }, updatedData)
      .then(() => {
        res.status(200).json({ message: 'Document updated successfully' });
      })

  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'An error occurred while updating the Bill' });
  }
}

const deleteBill = async (req, res) => {
  try {
    const billId = req.params.id;

    await Bill.deleteOne({ _id: billId })
      .then(() => {
        res.status(200).json({ message: 'Document deleted successfully' });
      })

  } catch (error) {
    console.error('Error deleting Bill:', error);
    res.status(500).json({ error: 'An error occurred while deleting the Bill' });
  }
}

module.exports = {
  getBills,
  getBill,
  addBill,
  updateBill,
  deleteBill
};
