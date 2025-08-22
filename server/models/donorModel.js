const mongoose = require('mongoose');

const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strMinutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + strMinutes + ' ' + ampm;
};

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  photo: { type: String },
  date: { type: Date, default: Date.now },
  time: { type: String, default: () => formatTime(new Date()) }, // Updated to use formatTime function
  status: { type: String, default: 'Pending' },
  recipient: { type: String, default: 'N/A' }
}, { timestamps: true });

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;
