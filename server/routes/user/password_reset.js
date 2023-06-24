const express = require('express');
const router = express.Router();
// const User = require('../../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const ResetPass = require('../../models/resetpass');

//forgot password
router.post('/forgot-password', async (req, res) => {
  console.log('Request body:', req.body);

  const {username,email} = req.body;

  console.log('Username:', username);
  console.log('Email:', email);
  // const { username, email } = .body;

  // Generate a reset token
  const token = crypto.randomBytes(20).toString('hex');

  //Generate reset URL mail
  const resetUrl = `https://127.0.0.1:7000/forgot-password?token=${token}`;

  // Store the token and its expiration in the user's record in the database
  const resetTokenExpiration = new Date(Date.now() + 3600000); // Token expires in 1 hour

  try {
    // Save the user's record to the database
    const resetPass = await ResetPass.create({
      username,
      email,
      resetToken: token,
      resetTokenExpiration,
    });
    res.status(200).json({ message: 'Reset token generated and stored.' });
  } catch (error) {
    console.error('Error storing reset token:', error);
    res.status(500).json({ error: 'An error occurred while storing the reset token.' });
  }
   

// Send the reset email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aim2crack@gmail.com',
    pass: 'wexjppcxdxsnlzqe',
  },
});

const mailOptions = {
  from: 'aim2crack@gmail.com',
  to: email,
  subject: 'Password Reset',
  text: `Click the following link to reset your password: ${resetUrl}`,
};

console.log('Mail options:', mailOptions);
  
  console.log('Sending reset email...');
  const info = await transporter.sendMail(mailOptions);
  console.log('Reset email sent:', info.response);
});




module.exports = router;