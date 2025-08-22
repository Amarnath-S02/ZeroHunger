//donorRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { createDonor } = require('../controllers/donorController');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('photo'), createDonor);

module.exports = router;
