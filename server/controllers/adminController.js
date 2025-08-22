// controllers/adminController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path based on your project structure
const Donor = require('../models/donorModel');

const adminUsername = "admin";
const adminPasswordHash = "$2b$10$uD1poLVNCyAw.I81bDfzDeGzSTEUb2eU5R8cWIrrNJ1tE1ewjlLma"; // Replace with actual bcrypt hashed password
const JWT_SECRET = process.env.JWT_SECRET || '7d019ba3af94e01b8fc6bdd74234595ad853bb1c7fbf11cc6af23f6b6d5d98c0d7f04478b60a45dd1c4f1594babe6b352eb4d79eb6f89d41d62aab90a6005e80'; // Use a more secure key in production

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (username === adminUsername) {
    const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);

    if (isPasswordValid) {
      // Generate a JWT token
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', token });
    }
  }

  return res.status(401).json({ message: 'Invalid username or password' });
};

const logoutAdmin = (req, res) => {
  // Since JWTs are stateless, there's no server-side session to clear
  // Invalidate JWT on client-side by removing it
  res.status(200).json({ message: 'Logged out successfully' });
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log('Fetched users:', users); // Log fetched users
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Log the error
    res.status(500).json({ message: 'Error fetching users' });
  }
};

  
  // Update a user's details
  const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, firstName, lastName, phone, address } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email, firstName, lastName, phone, address },
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user details' });
    }
  };

// Get all donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donor.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations', error });
  }
};

// Update a donation (status and recipient)
const updateDonation = async (req, res) => {
  const { donationId } = req.params;
  const { status, recipient } = req.body;

  try {
    const updatedDonation = await Donor.findByIdAndUpdate(
      donationId,
      { status, recipient },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating donation', error });
  }
};

module.exports = { loginAdmin, logoutAdmin, getAllUsers, updateUser, getAllDonations, updateDonation };
