const Request = require('../models/Request');
const Donation = require('../models/donationRequestModel');
const User = require('../models/User');
const nodemailer = require('nodemailer');

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
    const todayRequests = await Request.find({ date: todayDate , status: 'Pending' });

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

// Complete a donation request
const completeRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status: 'Completed' }, // Assuming you have a status field
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error completing request:', error);
    res.status(500).json({ message: 'Error updating request status' });
  }
};

// Function to initiate a donation and send an email
const initiateDonation = async (req, res) => {
  const { userEmail, requestEmail, foodItem, quantity } = req.body;

  console.log('Incoming donation request:', { userEmail, requestEmail, foodItem, quantity });

  try {
    // Find the recipient's information based on requestEmail (the recipient's email)
    const recipient = await User.findOne({ email: requestEmail });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Find the donor's information based on userEmail (the donor's email)
    const donor = await User.findOne({ email: userEmail });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
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

    // Create a new donation record
    const donationData = {
      donorId: donor._id, // Donor's ID
      donorName: donor.firstName + ' ' + donor.lastName, // Full name of donor
      donorEmail: donor.email, // Donor's email
      donorAddress: donor.address, // Donor's address
      userId: recipient._id, // Recipient's ID
      recipientName: recipient.firstName + ' ' + recipient.lastName, // Full name of recipient
      recipientEmail: recipient.email, // Recipient's email
      recipientAddress: recipient.address, // Recipient's address
      foodItem,
      quantity,
      donationDate: now.toISOString().split('T')[0], // Today's date
      donationTime: formatTime(now), // Formatted time as hh:mm AM/PM
      status: 'initiated', // Default status
    };

    // Save the donation request in the database (assuming you have a Donation model)
    const newDonation = new Donation(donationData);
    await newDonation.save();

    // Configure Nodemailer transport for sending the email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider
      auth: {
        user: process.env.EMAIL, // Replace with your email
        pass: process.env.PASS,  // Replace with your email password or an app-specific password
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL, // Sender address
      to: recipient.email,          // Recipient address
      subject: 'Donation Request Successful',
      html: `
        <h2>Dear ${recipient.firstName} ${recipient.lastName},</h2>
        <p>We are happy to inform you that a donation request has been successfully initiated by:</p>
        <ul>
          <li><strong>Donor Name:</strong> ${donor.firstName} ${donor.lastName}</li>
          <li><strong>Food Item:</strong> ${foodItem}</li>
          <li><strong>Quantity:</strong> ${quantity}</li>
          <li><strong>Donation Date:</strong> ${donationData.donationDate}</li>
          <li><strong>Donation Time:</strong> ${donationData.donationTime}</li>
        </ul>
        <p>Please reach out to the donor using their email <strong>${donor.email}</strong> to coordinate the pickup or delivery.</p>
        <br/>
        <p>Thank you for being a part of our mission to eliminate hunger!</p>
        <p>Best regards,</p>
        <p><strong>Your Organization Name</strong></p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Donation request created successfully and email sent to recipient', donation: newDonation });
  } catch (error) {
    console.error('Error initiating donation:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



module.exports = {
  createRequest,
  getTodayRequests,
  getAllRequests,
  updateRequest,
  completeRequest,
  initiateDonation,
};
