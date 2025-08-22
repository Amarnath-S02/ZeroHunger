// controllers/orphanageController.js
const Orphanage = require('../models/orphanageModel');
const Donation = require('../models/Donation');
const User = require('../models/User'); // Assuming you have a User model

const nodemailer = require('nodemailer');

const addOrphanage = async (req, res) => {
  try {
    const { name, email, phone, address, description } = req.body; // Extract description from req.body
    const image = req.file ? req.file.path : '';

    // Create a new Orphanage document with all the fields, including description
    const newOrphanage = new Orphanage({
      name,
      email,
      phone,
      address,
      description,  // Add description here
      image
    });

    // Save the new orphanage to the database
    await newOrphanage.save();

    // Send a success response with the newly created orphanage details
    res.status(201).json({
      success: true,
      message: 'Orphanage added successfully!',
      orphanage: newOrphanage
    });
  } catch (error) {
    console.error('Error adding orphanage:', error);
    // Handle errors and return an error response
    res.status(500).json({
      success: false,
      message: 'Failed to add orphanage.',
      error: error.message
    });
  }
};

// Get all orphanages
const getAllOrphanages = async (req, res) => {
    try {
      const orphanages = await Orphanage.find(); // Fetch all orphanages from the database
      res.status(200).json(orphanages); // Return orphanage data as JSON
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orphanages', error });
    }
  };
  
  // Update orphanage details
const updateOrphanage = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, orphanageImage, description } = req.body; // Add 'description' to destructured data

  try {
    const orphanage = await Orphanage.findById(id); // Find orphanage by ID

    if (!orphanage) {
      return res.status(404).json({ message: 'Orphanage not found' });
    }

    // Update orphanage fields with new data
    orphanage.name = name || orphanage.name;
    orphanage.email = email || orphanage.email;
    orphanage.phone = phone || orphanage.phone;
    orphanage.address = address || orphanage.address;
    orphanage.orphanageImage = orphanageImage || orphanage.orphanageImage;
    orphanage.description = description || orphanage.description; // Add description update

    // Save the updated orphanage
    const updatedOrphanage = await orphanage.save();

    res.status(200).json(updatedOrphanage); // Return the updated orphanage data
  } catch (error) {
    res.status(500).json({ message: 'Error updating orphanage', error });
  }
};

  // Get orphanage by ID
const getOrphanageById = async (req, res) => {
  const orphanageId = req.params.id; // Get orphanage ID from the URL

  try {
    const orphanage = await Orphanage.findById(orphanageId); // Fetch orphanage by ID

    if (!orphanage) {
      return res.status(404).json({ message: 'Orphanage not found' });
    }

    res.json(orphanage); // Return orphanage data as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an orphanage by ID
const deleteOrphanage = async (req, res) => {
  console.log(`Received request to delete orphanage with ID: ${req.params.id}`);
  try {
    const orphanageId = req.params.id;
    const deletedOrphanage = await Orphanage.findByIdAndDelete(orphanageId);
    if (!deletedOrphanage) {
      return res.status(404).json({ message: 'Orphanage not found' });
    }
    console.log(`Successfully deleted orphanage: ${deletedOrphanage}`);
    res.status(200).json({ message: 'Orphanage deleted successfully' });
  } catch (error) {
    console.error('Error during deletion:', error);  // Logs the specific error
    res.status(500).json({ message: 'Error deleting orphanage', error });
  }
};


const submitDonation = async (req, res) => {
  try {
    console.log("Incoming Donation Data:", req.body);

    const {
      userId,
      orphanageName,
      orphanageAddress,
      orphanageEmail,
      foodItem,
      quantity,
      donationDate,
      donationTime,
    } = req.body;

    // Find the user by userId in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new donation entry
    const newDonation = new Donation({
      userId,
      donorName: `${user.firstName} ${user.lastName}`,
      donorEmail: user.email,
      donorAddress: user.address,
      orphanageName,
      orphanageAddress,
      orphanageEmail,
      foodItem,
      quantity,
      donationDate,
      donationTime,
      status: 'initiated', // Initial status
    });

    await newDonation.save();

    // // Email setup
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS, // Use App Password if 2-factor authentication is enabled
      },
    });

    // Official email body with a button that updates the donation status to 'initiated'
    const mailOptions = {
      from: process.env.EMAIL,
      to: orphanageEmail,
      subject: 'Donation Offer from a Donor',
      html: `
        <h3>Dear ${orphanageName},</h3>
        <p>This is to officially notify you that a donor is available for a donation to your orphanage.</p>
        <p>Below are the details of the donor and the donation:</p>
        <ul>
          <li><strong>Donor Name:</strong> ${user.firstName} ${user.lastName}</li>
          <li><strong>Donor Email:</strong> ${user.email}</li>
          <li><strong>Donor Address:</strong> ${user.address}</li>
          <li><strong>Food Item:</strong> ${foodItem}</li>
          <li><strong>Quantity:</strong> ${quantity}</li>
          <li><strong>Donation Date:</strong> ${donationDate}</li>
          <li><strong>Donation Time:</strong> ${donationTime}</li>
        </ul>
        <p>Best regards,</p>
        <p>The Zero Hunger Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send a success response
    res.status(201).json({ message: 'Donation submitted successfully and email sent to the orphanage' });
  } catch (error) {
    console.error('Error submitting donation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all orphanage donations for a specific donor
const getOrphanageDonations = async (req, res) => {
  try {
    const { donorEmail } = req.query; // Get donor's email from query params

    if (!donorEmail) {
      return res.status(400).json({ message: 'Donor email is required' });
    }

    // Find orphanage donations by donorEmail
    const donations = await Donation.find({ donorEmail });

    if (donations.length === 0) {
      return res.status(404).json({ message: 'No orphanage donations found for this donor' });
    }

    // Return the orphanage donations
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching orphanage donations:', error);
    res.status(500).json({ message: 'Failed to fetch orphanage donations' });
  }
};


// Controller to fetch orphanage donations by donorEmail
const getOrphanageDonationsByEmail = async (req, res) => {
  try {
    const { donorEmail } = req.query;

    if (!donorEmail) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const orphanageDonations = await Donation.find({ donorEmail, status: 'waiting for approval' }).sort({ createdAt: -1 });

    if (orphanageDonations.length === 0) {
      return res.status(404).json({ message: 'No orphanage donations found' });
    }

    res.status(200).json(orphanageDonations);
  } catch (error) {
    console.error('Error fetching orphanage donations by email:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { 
  addOrphanage, 
  getAllOrphanages, 
  updateOrphanage, 
  getOrphanageById, 
  deleteOrphanage, 
  submitDonation, 
  getOrphanageDonations,
  getOrphanageDonationsByEmail
};
