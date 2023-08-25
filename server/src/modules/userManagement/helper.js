const Joi = require('joi');
const nodemailer = require('nodemailer');
require('dotenv').config();

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


const mailDetails = async (recipientEmail,resetToken) =>{
const mailOptions = {
    from: 'aim2crack@gmail.com',
    to: recipientEmail,
    subject: 'Email Verification',
    text: `Click the following link to verify your email:  ${process.env.BASE_URL}/verify/${resetToken}`,
  };

transporter.sendMail(mailOptions, (error, info) => {
    if (error) throw new Error(`Error: ${error} `);
    return info;
  });
}


  


module.exports = {
    validateUserData,
    getUserDetails,
    mailDetails,
    transporter
}