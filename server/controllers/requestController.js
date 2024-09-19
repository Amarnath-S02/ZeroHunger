const Request = require('../models/Request');

// Helper function to format time to AM/PM
const formatTimeToAmPm = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
};

const createRequest = async (req, res) => {
  try {
    const { name, email, address, city, foodItem, quantity, foodImage } = req.body;

    // Get current date and time
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString(); // Get date as "MM/DD/YYYY"
    const time = formatTimeToAmPm(currentDate); // Format time to AM/PM

    // Create new request
    const newRequest = new Request({
      name,
      email,
      address,
      city,
      foodItem,
      quantity,
      foodImage,
      date,
      time,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request created successfully', newRequest });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Helper function to get the current date in MM/DD/YYYY format
const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toLocaleDateString(); // Format date as "MM/DD/YYYY"
};

// Controller function to get today's requests
const getTodayRequests = async (req, res) => {
  try {
    const todayDate = getCurrentDate();

    // Query to find requests with today's date
    const todayRequests = await Request.find({ date: todayDate });

    if (!todayRequests.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(todayRequests);
  } catch (error) {
    console.error('Error fetching today\'s requests:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests' });
  }
};

// Update a request
const updateRequest = async (req, res) => {
  const { name, email, address, city, foodItem, quantity, foodImage, date, time, donor, status } = req.body;
  
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        address,
        city,
        foodItem,
        quantity,
        foodImage,
        date,
        time,
        donor,
        status,
      },
      { new: true } // return the updated document
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request', error });
  }
};

module.exports = {
  createRequest,
  getTodayRequests,
  getAllRequests,
  updateRequest,
};
