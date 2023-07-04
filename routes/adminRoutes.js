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
// router.get('/', adminController.getAdmin);

router.get('/admins', adminController.getAdmins);
router.post('/admin', adminController.addAdmin);
router.get('/admin/:id', adminController.getAdmin);
router.put('/admin/:id', adminController.updateAdmin);
router.delete('/admin/:id', adminController.deleteAdmin);

router.get('/members', memberController.getMembers);
router.post('/member', memberController.addMember);
router.put('/member/:id', memberController.updateMember);
router.put('/member/:id/notifications', memberController.updateNotification);
router.delete('/member/:id', memberController.deleteMember);

router.get('/users', userController.getUsers);
router.post('/user', userController.addUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.get('/bills', billController.getBills);
router.post('/bill', billController.addBill);
router.put('/bill/:id', billController.updateBill);
router.delete('/bill/:id', billController.deleteBill);

router.get('/packages', packageController.getPackages);
router.post('/package', packageController.addPackage);
router.put('/package/:id', packageController.updatePackage);
router.delete('/package/:id', packageController.deletePackage);

router.get('/notification', notificationController.getNotification);
router.post('/notification', notificationController.addNotification);
router.put('/notification/:id', notificationController.updateNotification);

// Add more routes as needed

module.exports = router;
