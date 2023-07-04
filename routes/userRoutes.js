const express = require('express');
const router = express.Router();

// Import user controller
const userController = require('../controllers/userController');

// Define user routes
// router.get('/', userController.getUsers);
// Add more routes as needed

router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser);

module.exports = router;
