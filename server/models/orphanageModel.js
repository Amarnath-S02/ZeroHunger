// models/orphanageModel.js
const mongoose = require('mongoose');

const orphanageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  description: {
    type: String, // Add the description field to the schema
    required: false // Can be optional
  },
  address: { type: String, required: true },
  image: { type: String, required: true }  // URL or path to the image
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Orphanage', orphanageSchema);
