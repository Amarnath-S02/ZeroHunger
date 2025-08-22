// routes/orphanageRoutes.js
const express = require('express');
const router = express.Router();
const { 
    addOrphanage, 
    getAllOrphanages, 
    updateOrphanage, 
    getOrphanageById, 
    deleteOrphanage, 
    submitDonation,
    getOrphanageDonations,
    getOrphanageDonationsByEmail,
} = require('../controllers/orphanageController');

// Route to add a new orphanage
router.post('/', addOrphanage);

// Route to get all orphanages
router.get('/view', getAllOrphanages);

// Route to update orphanage details
router.put('/:id', updateOrphanage);

// Route to get orphanage by ID
router.get('/:id', getOrphanageById);

// New route for deleting orphanage
router.delete('/:id', deleteOrphanage); // Delete orphanage by ID

router.post('/submit', submitDonation);

// Route to get orphanage donations by orphanage name
router.get('/orphanage', getOrphanageDonations);

// Route to fetch orphanage donations by donorEmail
router.get('/completed', getOrphanageDonationsByEmail);


module.exports = router;
