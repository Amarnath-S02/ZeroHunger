// routes/orphanageRoutes.js
const express = require('express');
const router = express.Router();
const { addOrphanage, getAllOrphanages, updateOrphanage } = require('../controllers/orphanageController');

// Route to add a new orphanage
router.post('/', addOrphanage);

// Route to get all orphanages
router.get('/view', getAllOrphanages);

// Route to update orphanage details
router.put('/:id', updateOrphanage);

module.exports = router;
