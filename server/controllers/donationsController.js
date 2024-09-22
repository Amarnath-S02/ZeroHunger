//donationsController.js
const Donor = require('../models/donorModel');

// Controller function to get donations for the current date
const getDonationsToday = async (req, res) => {
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);
  
      const donations = await Donor.find({
        createdAt: { $gte: todayStart, $lt: todayEnd }
      });
  
      if (donations.length === 0) {
        return res.json({ message: 'No donations available for today.' });
      }
  
      res.json(donations);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };  

// Controller to handle updating a donation
const updateDonation = async (req, res) => {
  const donationId = req.params.id;
  const { date, time, address, city, status, recipient } = req.body;

  try {
    // Find the donation by ID and update the fields
    const updatedDonation = await Donation.findByIdAndUpdate(
      donationId,
      {
        date,           // Update date
        time,           // Update time
        address,        // Update address
        city,           // Update city
        status,         // Update donation status
        recipient       // Update recipient username
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    return res.status(200).json({
      message: 'Donation updated successfully',
      updatedDonation
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating donation', error });
  }
};

module.exports = {
  getDonationsToday,
  updateDonation,
};
