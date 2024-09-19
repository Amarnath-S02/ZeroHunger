// routes/orphanageRoutes.js
const express = require('express');
const router = express.Router();
const { addOrphanage } = require('../controllers/orphanageController');

// Route to add a new orphanage
router.post('/', addOrphanage);

module.exports = router;
