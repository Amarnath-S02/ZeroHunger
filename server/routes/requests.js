const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');


// Create a new request
router.post('/create', requestController.createRequest);
// Route to fetch requests for today's date
router.get('/today', requestController.getRequestsForToday);

module.exports = router;
