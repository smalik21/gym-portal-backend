const express = require('express');
const router = express.Router();

// Import user controller
const userController = require('../controllers/userController');

// Define user routes

// Get a specific user by ID
router.get('/user/:id', userController.getUser);

// Update a specific user by ID
router.put('/user/:id', userController.updateUser);

// Add more routes as needed

module.exports = router;
