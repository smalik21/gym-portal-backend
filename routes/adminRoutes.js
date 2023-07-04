const express = require('express');
const router = express.Router();

// Import controllers
const adminController = require('../controllers/adminController');
const memberController = require('../controllers/memberController');
const userController = require('../controllers/userController');
const billController = require('../controllers/billController');
const packageController = require('../controllers/packageController');
const notificationController = require('../controllers/notificationController');

// Define admin routes

// Admin routes
router.get('/admins', adminController.getAdmins); // Get all admins
router.post('/admin', adminController.addAdmin); // Add a new admin
router.get('/admin/:id', adminController.getAdmin); // Get an admin by ID
router.put('/admin/:id', adminController.updateAdmin); // Update an admin by ID
router.delete('/admin/:id', adminController.deleteAdmin); // Delete an admin by ID

// Member routes
router.get('/members', memberController.getMembers); // Get all members
router.post('/member', memberController.addMember); // Add a new member
router.put('/member/:id', memberController.updateMember); // Update a member by ID
router.put('/member/:id/notifications', memberController.updateNotification); // Update member notifications
router.delete('/member/:id', memberController.deleteMember); // Delete a member by ID

// User routes
router.get('/users', userController.getUsers); // Get all users
router.post('/user', userController.addUser); // Add a new user
router.put('/user/:id', userController.updateUser); // Update a user by ID
router.delete('/user/:id', userController.deleteUser); // Delete a user by ID

// Bill routes
router.get('/bills', billController.getBills); // Get all bills
router.post('/bill', billController.addBill); // Add a new bill
router.put('/bill/:id', billController.updateBill); // Update a bill by ID
router.delete('/bill/:id', billController.deleteBill); // Delete a bill by ID

// Package routes
router.get('/packages', packageController.getPackages); // Get all packages
router.post('/package', packageController.addPackage); // Add a new package
router.put('/package/:id', packageController.updatePackage); // Update a package by ID
router.delete('/package/:id', packageController.deletePackage); // Delete a package by ID

// Notification routes
router.get('/notification', notificationController.getNotification); // Get notification
router.post('/notification', notificationController.addNotification); // Add a new notification
router.put('/notification/:id', notificationController.updateNotification); // Update a notification by ID

// Add more routes as needed

module.exports = router;
