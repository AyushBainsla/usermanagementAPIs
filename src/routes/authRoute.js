const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const { isLoggedOut } = require('../middleware/authMiddleware');

// User Authentication Routes
router
  .get('/login', isLoggedOut, authController.getUserLogin)
  .post('/login', isLoggedOut, authController.userLogin);

router
  .get('/register', isLoggedOut, authController.getUserRegister)
  .post('/register', authController.userRegister);

// Profile Routes for CRUD Operations
router.get('/profile', authController.getUserProfile);       // View Profile
router.get('/list',    authController.getAllUsers);       // View Profile
router.post('/profile', authController.updateUserProfile);   // Update Profile
router.delete('/profile', authController.deleteUserAccount); // Delete Account

// Logout Route
router.get('/logout', authController.logout);

module.exports = router;
