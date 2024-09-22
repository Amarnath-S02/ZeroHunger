//donations.js
const express = require('express');
const router = express.Router();
const { getDonationsToday, updateDonation } = require('../controllers/donationsController');

// Route to get donations for the current date
router.get('/today', getDonationsToday);

// PUT request to update donation details (including date, time, address, city, status, and recipient)
router.put('/:id', updateDonation);

module.exports = router;
