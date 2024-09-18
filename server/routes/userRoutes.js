// userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserById } = require('../controllers/userController');
const upload = require('../utils/multerSetup');
const { protect } = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middlewares/authenticateToken'); // Import the JWT auth middleware

const router = express.Router();

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);
router.get('/:id', protect, getUserById);

// Secret key (ensure this matches the one you used to generate the JWT)
const JWT_SECRET = process.env.JWT_SECRET;

// GET user profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching profile data', error: err });
    }
});
  
  // UPDATE user profile
  router.put('/profile', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const updatedData = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      };
  
      const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json({ message: 'Profile updated successfully', user });
    } catch (err) {
      res.status(500).json({ message: 'Error updating profile', error: err });
    }
});

module.exports = router;