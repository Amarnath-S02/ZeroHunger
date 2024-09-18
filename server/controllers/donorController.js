const Donor = require('../models/donorModel');

const createDonor = async (req, res) => {
  try {
    const { name, email, address, city, foodItem, quantity } = req.body;
    const photo = req.file ? req.file.path : '';

    const newDonor = new Donor({
      name,
      email,
      address,
      city,
      foodItem,
      quantity,
      photo,
      // createdAt is automatically set to current date and time
    });

    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createDonor };


