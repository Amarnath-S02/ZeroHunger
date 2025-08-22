// models/Donation.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  donorName: {
    type: String,
    required: true,
  },
  donorEmail: {
    type: String,
    required: true,
  },
  donorAddress: {
    type: String,
    required: true,
  },
  orphanageName: {
    type: String,
    required: true,
  },
  orphanageAddress: {
    type: String,
    required: true,
  },
  orphanageEmail: {
    type: String,
    required: true,
  },
  foodItem: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  donationDate: {
    type: String,
    required: true,
  },
  donationTime: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner'],
  },
  status: {
    type: String,
    enum: ['waiting for approval','initiated', 'progress', 'completed'],
    default: 'waiting for approval', // Default value set to 'initiated'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Donation', donationSchema);
