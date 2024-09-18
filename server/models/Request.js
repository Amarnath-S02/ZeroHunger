const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  foodImage: { type: String },
  requestDate: { type: String }, // Storing date as string (YYYY-MM-DD)
  requestTime: { type: String }, // Storing time as string (HH:MM:SS)
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
