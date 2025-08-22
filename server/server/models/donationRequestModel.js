// donationRequestModel.js (create this file if it does not exist)

const mongoose = require('mongoose');

const donationRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  donorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  donorName: { type: String, required: true },
  donorEmail: { type: String, required: true },
  donorAddress: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  recipientAddress: { type: String, required: true },
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  donationDate: { type: String, required: true }, // Store date as string
  donationTime: { type: String, required: true }, // Store time as string
  status: { type: String, default: 'waiting for approval' },
}, { timestamps: true });

const DonationRequest = mongoose.model('DonationRequest', donationRequestSchema);

module.exports = DonationRequest;
