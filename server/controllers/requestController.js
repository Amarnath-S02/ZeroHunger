// /controllers/requestController.js
const Request = require('../models/Request');

// Handle request creation
exports.createRequest = async (req, res) => {
  try {
    const { name, email, address, city, foodItem, quantity, foodImage } = req.body;

    // Validate required fields
    if (!name || !email || !address || !city || !foodItem || !quantity) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Get current date and time
    const now = new Date();
    const requestDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const requestTime = now.toTimeString().split(' ')[0]; // HH:MM:SS

    // Create new request object
    const newRequest = new Request({
      name,
      email,
      address,
      city,
      foodItem,
      quantity,
      foodImage,
      requestDate,  // Store the date
      requestTime,  // Store the time
    });

    // Save to the database
    await newRequest.save();

    // Send success response
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Controller to fetch requests for today's date
exports.getRequestsForToday = async (req, res) => {
  try {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format

    // Find all requests where the `requestDate` matches today’s date
    const requests = await Request.find({ requestDate: todayDate });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching today’s requests:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
