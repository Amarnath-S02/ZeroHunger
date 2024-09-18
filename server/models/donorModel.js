//donorModel.js
const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  photo: { type: String },
  date: { type: Date, default: Date.now },
  time: { type: String, default: new Date().toLocaleTimeString() },
  status: { type: String, default: 'Pending' }, // New field for status
  recipient: { type: String, default: 'N/A' }   // New field for recipient
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;
