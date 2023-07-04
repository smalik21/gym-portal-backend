const express = require('express');
const router = express.Router();

// Import member controller
const memberController = require('../controllers/memberController');
const billController = require('../controllers/billController');

// Define member routes
// router.get('/', memberController.getMembers);
// Add more routes as needed
router.get('/member/:id', memberController.getMember);
router.put('/member/:id', memberController.updateMember);
router.put('/member/:id/notifications', memberController.updateNotification);

router.get('/bills/:id', billController.getBill);
router.put('/bill/:id', billController.updateBill);

module.exports = router;
