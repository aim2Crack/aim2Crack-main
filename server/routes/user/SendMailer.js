const nodemailer = require('nodemailer');
// const User = require('../../models/user');
require('dotenv').config();

// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: 'aim2crack@gmail.com',
    pass: 'wexjppcxdxsnlzqe',
  },
});

// Function to send the verification email
const sendVerificationEmail = (recipientEmail, verificationToken) => {
    const mailOptions = {
        from: 'aim2crack@gmail.com',
        to: recipientEmail,
        subject: 'Email Verification',
        text: `Click the following link to verify your email:  ${process.env.BASE_URL}/verify/${verificationToken}`,
      };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending verification email:', error);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
};

module.exports = {
  sendVerificationEmail,
};
