//donationsController.js
const Donor = require('../models/donorModel');
const Donation = require('../models/donationRequestModel');
const User = require('../models/User'); // Adjust the path to your User model
const mongoose = require('mongoose'); // Import mongoose for ObjectId

// Controller function to get donations for the current date
const getDonationsToday = async (req, res) => {
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);
  
      const donations = await Donor.find({
        createdAt: { $gte: todayStart, $lt: todayEnd },
        status: 'Pending'  // Only get donations with "Pending" status
      });
  
      if (donations.length === 0) {
        return res.json({ message: 'No donations available for today.' });
      }
  
      res.json(donations);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };  

// Controller to handle updating a donation
const updateDonation = async (req, res) => {
  const donationId = req.params.id;
  const { date, time, address, city, status, recipient } = req.body;

  try {
    // Find the donation by ID and update the fields
    const updatedDonation = await Donation.findByIdAndUpdate(
      donationId,
      {
        date,           // Update date
        time,           // Update time
        address,        // Update address
        city,           // Update city
        status,         // Update donation status
        recipient       // Update recipient username
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    return res.status(200).json({
      message: 'Donation updated successfully',
      updatedDonation
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating donation', error });
  }
};

// Controller to handle donation requests
const handleDonationRequest = async (req, res) => {
  const { userEmail, donorEmail, foodItem, quantity } = req.body;

  try {
    // Find the donor's information based on the donorEmail
    const donor = await User.findOne({ email: donorEmail });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Find the recipient's information based on the userEmail
    const recipient = await User.findOne({ email: userEmail });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Create a new donation request
    const donationRequest = {
      userId: recipient._id, // Recipient's ID
      donorId: donor._id, // Donor's ID
      donorName: donor.firstName + ' ' + donor.lastName, // Full name of donor
      donorEmail: donor.email, // Donor's email
      donorAddress: donor.address, // Donor's address
      recipientName: recipient.firstName + ' ' + recipient.lastName, // Full name of recipient
      recipientEmail: recipient.email, // Recipient's email
      recipientAddress: recipient.address, // Recipient's address
      foodItem,
      quantity,
      donationDate: new Date().toISOString().split('T')[0], // Today's date
      donationTime: new Date().toISOString().split('T')[1].split('.')[0], // Current time
      status: 'waiting for approval', // Default status
    };

    // Save the donation request in the database (assuming you have a DonationRequest model)
    const newRequest = new Donation(donationRequest);
    await newRequest.save();

    res.status(201).json({ message: 'Donation request created successfully', request: newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Update the status of a donation to "Completed"
const completeDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donor.findById(id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    donation.status = 'Completed';
    await donation.save();

    res.json({ message: 'Donation status updated to Completed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get donation requests based on status and user email
const getDonationRequests = async (req, res) => {
  const { status, email } = req.query;

  try {
    // Fetch donations with the provided status and donor email
    const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);
  
    const donations = await Donation.find({
      status: status || 'waiting for approval',
      donorEmail: email,
      createdAt: { $gte: todayStart, $lt: todayEnd }
    });

    // Send the retrieved donations as a response
    res.status(200).json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch donation requests' });
  }
};

// Controller to approve a donation request by updating its status
const approveDonation = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the donation by its ID and update the status to 'initiated'
    const updatedDonation = await Donation.findByIdAndUpdate(id, { status: 'initiated' }, { new: true });

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Send a success response with the updated donation
    res.status(200).json({ message: 'Donation approved', donation: updatedDonation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to approve donation' });
  }
};

// Controller to get received donations with status 'initiated' and matching email
const getReceivedFoods = async (req, res) => {
  try {
    const { status, email } = req.query; // Get status and email from query parameters

    // Check if both email and status are provided
    if (!email || !status) {
      return res.status(400).json({ message: 'Email and status are required' });
    }

    // Fetch donations where status is 'initiated' and donorEmail matches the query email
    const receivedFoods = await Donation.find({ status: status, recipientEmail: email });

    // Send back the results
    res.status(200).json(receivedFoods);
  } catch (error) {
    console.error('Error fetching received donations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const markAsReceived = async (req, res) => {
  try {
    const donationId = req.params.id;

    // Update the donation status to 'completed'
    const updatedDonation = await Donation.findByIdAndUpdate(
      donationId, 
      { status: 'completed' }, 
      { new: true } // Return the updated document
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json({ message: 'Donation marked as received', updatedDonation });
  } catch (error) {
    console.error('Error marking donation as received:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to fetch completed donations by donorEmail
const getCompletedDonations = async (req, res) => {
  try {
    const { donorEmail } = req.query;

    // Find donations where status is 'completed' and donorEmail matches the query
    const donations = await Donation.find({ status: 'completed', donorEmail });

    // Check if donations exist
    if (donations.length === 0) {
      return res.status(404).json({ message: 'No completed donations found' });
    }

    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching completed donations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDonationsToday,
  updateDonation,
  handleDonationRequest,
  completeDonation,
  getDonationRequests,
  approveDonation,
  getReceivedFoods,
  markAsReceived,
  getCompletedDonations,
};
