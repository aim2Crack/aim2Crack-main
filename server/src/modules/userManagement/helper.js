const Joi = require('joi');
const nodemailer = require('nodemailer');
const express = require('express');
const multer = require('multer');
const path = require('path'); // Import the 'path' module
const router = express.Router();
require('dotenv').config();
const {resetTokenExpTime} = require('./constants')
const { findUser, deleteResetDetails, createResetDetails} = require('./dto');

const crypto = require('crypto');

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$')).required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    profileType: Joi.string().valid('student', 'faculty').required(),
});


const validateUserData = async (details) => {
    const { username, password, email, phone, profileType } = details;
    const { error, value } = userSchema.validate({
        username: username.toLowerCase(),
        password: password,
        email: email.toLowerCase(),
        phone: phone,
        profileType
    });
    if (error) throw new Error(`Error: ${error} `);
    return value;
}

const getUserDetails = async (user) => {
    return {
        username: user.username,
        email: user.email,
        profileType: user.profileType,
        isEmailVerified: user.emailVerify
    };
}

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: 'aim2crack@gmail.com',
      pass: 'wexjppcxdxsnlzqe',
    },
  });


const mailDetails = async (details) =>{
const {email,resetToken}=details;
  const mailOptions = {
    from: 'aim2crack@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Click the following link to verify your email:  ${process.env.BASE_URL}/verify/${resetToken}`,
  };

transporter.sendMail(mailOptions, (error, info) => {
    if (error) throw new Error(`Error: ${error} `);
    return info;
  });
}

// Function to send the verification email
const sendVerificationEmail = async (username, email,status) => {
  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiration = new Date(Date.now() + resetTokenExpTime); // Token expires in 1o minutes
  const user = await findUser({ username, email });
   // when the user request multiple times, old link will get deleted even if the token is not expired
  await deleteResetDetails(user.username);
  const resetPass = await createResetDetails({
      username: username,
      email: user.email, 
      resetToken: resetToken,
      resetTokenExpiration: resetTokenExpiration,
      status: status
  });
  
  await mailDetails({
      email: user.email,
      resetToken: resetToken
  });
};

// Multer Configuration

const fileupload = async (req, filepath) => {
  // Create an instance of multer and configure it with the storage options
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'+filepath); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Generate unique filenames
    },
  });

  const upload = multer({ storage });

  // Use the `upload.single` middleware to handle a single file upload
  return new Promise((resolve, reject) => {
    upload.single('file')(req, {}, (err) => {
      if (err) {
        reject(err); // Handle any errors that occurred during file upload
      } else {
        resolve(); // File upload succeeded
      }
    });
  });
};


module.exports = {
    validateUserData,
    getUserDetails,
    mailDetails,
    transporter,
    sendVerificationEmail,
    fileupload
}