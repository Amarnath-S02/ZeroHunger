const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
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
  foodImage: { 
    type: String 
  }, // URL or path to the food image
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: { type: String, default: 'Pending' }, // New field for status
  donor: { type: String, default: 'N/A' }   // New field for recipient
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
