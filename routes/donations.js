//donations.js
const express = require('express');
const router = express.Router();
const { 
    getDonationsToday,
    updateDonation, 
    handleDonationRequest, 
    completeDonation, 
    getDonationRequests,
    getInitiatedDonationRequests,
    approveDonation, 
    getReceivedFoods,
    markAsReceived,
    getCompletedDonations,
    getOrphanageDonationsByEmail
} = require('../controllers/donationsController');

// Route to get donations for the current date
router.get('/today', getDonationsToday);

// PUT request to update donation details (including date, time, address, city, status, and recipient)
router.put('/:id', updateDonation);

// POST route to handle donation requests
router.post('/request', handleDonationRequest);

// Route to update donation status
router.put('/:id/complete', completeDonation);

// Route to get donation requests filtered by status and email
router.get('/', getDonationRequests,getInitiatedDonationRequests);

// Route to approve a donation by its ID
router.patch('/:id/approve', approveDonation);

// Route to get received foods with status 'initiated' and email from query params
router.get('/received', getReceivedFoods);

// Route to mark a donation as received
router.patch('/:id/complete', markAsReceived);

// Define the route to fetch completed donations by donorEmail
router.get('/completed', getCompletedDonations);

// Route to fetch completed orphanage donations
router.get('/completed/orphanage', getOrphanageDonationsByEmail);

module.exports = router;
