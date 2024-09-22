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

// Get all orphanages
const getAllOrphanages = async (req, res) => {
    try {
      const orphanages = await Orphanage.find(); // Fetch all orphanages from the database
      res.status(200).json(orphanages); // Return orphanage data as JSON
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orphanages', error });
    }
  };
  
  // Update orphanage details
  const updateOrphanage = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, orphanageImage } = req.body;
  
    try {
      const orphanage = await Orphanage.findById(id); // Find orphanage by ID
  
      if (!orphanage) {
        return res.status(404).json({ message: 'Orphanage not found' });
      }
  
      // Update orphanage fields with new data
      orphanage.name = name || orphanage.name;
      orphanage.email = email || orphanage.email;
      orphanage.phone = phone || orphanage.phone;
      orphanage.address = address || orphanage.address;
      orphanage.orphanageImage = orphanageImage || orphanage.orphanageImage;
  
      // Save the updated orphanage
      const updatedOrphanage = await orphanage.save();
  
      res.status(200).json(updatedOrphanage); // Return the updated orphanage data
    } catch (error) {
      res.status(500).json({ message: 'Error updating orphanage', error });
    }
  };

module.exports = { addOrphanage, getAllOrphanages, updateOrphanage };
