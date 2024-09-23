// userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserById, getUserNavById, getUserProfile, updateUserProfile } = require('../controllers/userController');
const upload = require('../utils/multerSetup');
const { protect, verifyToken } = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);
router.get('/:id', protect, getUserById);

// Route to get user data by ID for navbar
router.get('/nav/:id', getUserNavById);

// Route to get user profile by ID
router.get('/account/:id', verifyToken, getUserProfile);
router.put('/account/:id', authMiddleware, updateUserProfile);

module.exports = router;