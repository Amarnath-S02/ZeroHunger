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

module.exports = {
  getDonationsToday,
};
