// userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Number of salt rounds for bcrypt
const saltRounds = 10;

const registerUser = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, phone, address } = req.body;
        const profileImage = req.file ? req.file.filename : null;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'Email already exists' });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            address,
            profileImage,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
};

const JWT_SECRET = process.env.JWT_SECRET || '7d019ba3af94e01b8fc6bdd74234595ad853bb1c7fbf11cc6af23f6b6d5d98c0d7f04478b60a45dd1c4f1594babe6b352eb4d79eb6f89d41d62aab90a6005e80';

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to fetch user data by ID
const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('name email address');
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { registerUser, loginUser, getUserById };