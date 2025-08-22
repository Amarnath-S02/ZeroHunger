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

// const Donor = require('../models/donorModel');
// const User = require('../models/User'); // Assuming you have a User model
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const createDonor = async (req, res) => {
//   try {
//     const { name, email, address, city, foodItem, quantity } = req.body;
//     const photo = req.file ? req.file.path : '';

//     // Step 1: Create a new donor record
//     const newDonor = new Donor({
//       name,
//       email,
//       address,
//       city,
//       foodItem,
//       quantity,
//       photo,
//     });

//     await newDonor.save();

//     // Step 2: Get all users except the donor
//     const users = await User.find({ email: { $ne: email } });

//    const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });
// console.log('Email:', process.env.EMAIL);
// console.log('Password:', process.env.PASS); 
//     // Step 4: Send an email to each user
//     const mailOptions = {
//       from: process.env.EMAIL, // your email
//       subject: 'New Donation Alert',
//       html: `<p>Hello,</p><p>A new food donation has been made by ${name}. Here are the details:</p>
//              <ul>
//                <li>Food Item: ${foodItem}</li>
//                <li>Quantity: ${quantity}</li>
//                <li>City: ${city}</li>
//              </ul>
//              <p>Kindly check and support if needed.</p>`,
//     };

//     for (const user of users) {
//       mailOptions.to = user.email; // Send email to each user
//       await transporter.sendMail(mailOptions);
//     }

//     res.status(201).json(newDonor);
//   } catch (error) {
//     console.error('Error creating donor or sending emails:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { createDonor };