const express = require('express');
const router = express.Router();

// Import member controller
const memberController = require('../controllers/memberController');
const billController = require('../controllers/billController');

// Define member routes

// Get a specific member by ID
router.get('/member/:id', memberController.getMember);

// Update a specific member by ID
router.put('/member/:id', memberController.updateMember);

// Update member notifications
router.put('/member/:id/notifications', memberController.updateNotification);

// Get a specific bill by ID
router.get('/bills/:id', billController.getBill);

// Update a specific bill by ID
router.put('/bill/:id', billController.updateBill);

module.exports = router;
