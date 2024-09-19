const express = require('express');
const { createRequest, getTodayRequests, getAllRequests, updateRequest } = require('../controllers/requestController');

const router = express.Router();

// POST request - Create a new food request
router.post('/create', createRequest);

router.get('/today', getTodayRequests); // Route to get requests for today

// Route to get all requests
router.get('/', getAllRequests);

// Route to update a request by ID
router.put('/:id', updateRequest);

module.exports = router;
