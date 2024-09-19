// controllers/orphanageController.js
const Orphanage = require('../models/orphanageModel');

const addOrphanage = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const image = req.file ? req.file.path : '';

    const newOrphanage = new Orphanage({
      name,
      email,
      phone,
      address,
      image
    });

    await newOrphanage.save();

    res.status(201).json({
      success: true,
      message: 'Orphanage added successfully!',
      orphanage: newOrphanage
    });
  } catch (error) {
    console.error('Error adding orphanage:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add orphanage.',
      error: error.message
    });
  }
};

module.exports = { addOrphanage };
