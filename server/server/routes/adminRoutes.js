// routes/adminRoutes.js
const express = require('express');
const { loginAdmin, logoutAdmin, getAllUsers, updateUser } = require('../controllers/adminController');
const adminDonationsController = require('../controllers/adminController');
const router = express.Router();

// Login route
router.post('/login', loginAdmin);

// Logout route
router.post('/logout', logoutAdmin);

// Route to get all users
router.get('/users', getAllUsers);

// Route to update user details
router.put('/users/:id', updateUser);

// Get all donations
router.get('/donations', adminDonationsController.getAllDonations);

// Update donation (status and recipient)
router.put('/donations/:donationId', adminDonationsController.updateDonation);

module.exports = router;
