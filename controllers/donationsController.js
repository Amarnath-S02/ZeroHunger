//donationsController.js
const Donor = require('../models/donorModel');
const Donation = require('../models/donationRequestModel');
const Orphanages = require('../models/Donation')
const User = require('../models/User'); // Adjust the path to your User model
const mongoose = require('mongoose'); // Import mongoose for ObjectId

const nodemailer = require('nodemailer'); // Import nodemailer

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

    // Function to format time as hh:mm AM/PM
    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12; // Convert to 12-hour format
      hours = hours ? hours : 12; // The hour '0' should be '12'
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      return `${hours}:${formattedMinutes} ${ampm}`;
    };

    // Get current date and time
    const now = new Date();

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
      donationDate: now.toISOString().split('T')[0], // Today's date
      donationTime: formatTime(now), // Formatted time as hh:mm AM/PM
      status: 'waiting for approval', // Default status
    };

    // Save the donation request in the database (assuming you have a DonationRequest model)
    const newRequest = new Donation(donationRequest);
    await newRequest.save();

    // Email setup
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS, // Use an app-specific password if 2-factor authentication is enabled
      },
    });

    // Email body to notify donor that a recipient is available to request their donation
    const mailOptions = {
      from: process.env.EMAIL,
      to: donorEmail,
      subject: 'Recipient Available to Request Your Donation',
      html: `
        <h3>Dear ${donor.firstName} ${donor.lastName},</h3>
        <p>We are pleased to inform you that a recipient is available to request your donation.</p>
        <p>Below are the details of the donation request:</p>
        <ul>
          <li><strong>Recipient Name:</strong> ${recipient.firstName} ${recipient.lastName}</li>
          <li><strong>Recipient Email:</strong> ${recipient.email}</li>
          <li><strong>Food Item:</strong> ${foodItem}</li>
          <li><strong>Quantity:</strong> ${quantity}</li>
          <li><strong>Donation Date:</strong> ${donationRequest.donationDate}</li>
          <li><strong>Donation Time:</strong> ${donationRequest.donationTime}</li>
        </ul>
        <p>Please feel free to contact the recipient directly at their provided email if you wish to proceed with the donation.</p>
        <p>Best regards,</p>
        <p>The Zero Hunger Team</p>
      `,
    };

    // Send the email to the donor
    await transporter.sendMail(mailOptions);

    // Send a success response
    res.status(201).json({
      message: 'Donation request created successfully, and email sent to the donor',
      request: newRequest,
    });

  } catch (error) {
    console.error('Error handling donation request:', error);
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

const getInitiatedDonationRequests = async (req, res) => {
  const { status, email } = req.query;

  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Find donations with the specified status and donor email
    const donations = await Donation.find({
      status: status || 'initiated',
      donorEmail: email,
      createdAt: { $gte: todayStart, $lt: todayEnd },
    });

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

    // Email setup
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS, // Use an app-specific password if 2-factor authentication is enabled
      },
    });

    // Email content to notify recipient
    const mailOptions = {
      from: process.env.EMAIL,
      to: updatedDonation.recipientEmail,
      subject: 'Donation Request Approved',
      html: `
        <h3>Dear ${updatedDonation.recipientName},</h3>
        <p>We are pleased to inform you that your donation request has been approved by the donor.</p>
        <p>Below are the details of the approved donation:</p>
        <ul>
          <li><strong>Donor Name:</strong> ${updatedDonation.donorName}</li>
          <li><strong>Food Item:</strong> ${updatedDonation.foodItem}</li>
          <li><strong>Quantity:</strong> ${updatedDonation.quantity}</li>
          <li><strong>Donation Date:</strong> ${updatedDonation.donationDate}</li>
          <li><strong>Donation Time:</strong> ${updatedDonation.donationTime}</li>
          <li><strong>Status:</strong> Initiated</li>
        </ul>
        <p>Please coordinate with the donor at their provided email for further details.</p>
        <p>Best regards,</p>
        <p>The Zero Hunger Team</p>
      `,
    };

    // Send the email to the recipient
    await transporter.sendMail(mailOptions);

    // Send a success response with the updated donation
    res.status(200).json({ message: 'Donation approved and email sent to recipient', donation: updatedDonation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to approve donation and send email' });
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


// Controller to mark donation as received and send email notification to the donor
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

    // Email setup
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS, // Use app password if 2-factor authentication is enabled
      },
    });

    // Email content to notify donor that the recipient has received the food
    const mailOptions = {
      from: process.env.EMAIL,
      to: updatedDonation.donorEmail,
      subject: 'Donation Completed: Recipient Has Received the Food',
      html: `
        <h3>Dear ${updatedDonation.donorName},</h3>
        <p>We are happy to inform you that the recipient has successfully received your donation.</p>
        <p>Below are the details of your completed donation:</p>
        <ul>
          <li><strong>Recipient Name:</strong> ${updatedDonation.recipientName}</li>
          <li><strong>Food Item:</strong> ${updatedDonation.foodItem}</li>
          <li><strong>Quantity:</strong> ${updatedDonation.quantity}</li>
          <li><strong>Donation Date:</strong> ${updatedDonation.donationDate}</li>
          <li><strong>Donation Time:</strong> ${updatedDonation.donationTime}</li>
          <li><strong>Status:</strong> Completed</li>
        </ul>
        <p>Thank you for your generous contribution and helping to fight hunger!</p>
        <p>Best regards,</p>
        <p>The Zero Hunger Team</p>
      `,
    };

    // Send the email to the donor
    await transporter.sendMail(mailOptions);

    // Send a success response with the updated donation
    res.status(200).json({ message: 'Donation marked as received and email sent to donor', updatedDonation });
  } catch (error) {
    console.error('Error marking donation as received and sending email:', error);
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

// Controller to fetch orphanage donations by donorEmail
const getOrphanageDonationsByEmail = async (req, res) => {
  const donorEmail = req.query.donorEmail;
  try {
    const donations = await Orphanages.find({ donorEmail, status: 'initiated' }).sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching orphanage donations:', error);
    res.status(500).json({ message: 'Failed to fetch orphanage donations.' });
  }
};

module.exports = {
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
};
