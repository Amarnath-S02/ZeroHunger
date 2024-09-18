//donations.js
const express = require('express');
const router = express.Router();
const { getDonationsToday } = require('../controllers/donationsController');

// Route to get donations for the current date
router.get('/today', getDonationsToday);

module.exports = router;
