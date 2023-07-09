const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();
const ResetPass = require('../../models/resetpass');
const { Op, Sequelize} = require('sequelize');
//forgot password
const mailer=require('./SendMailer')

router.post('/forgot-password', async (req, res) => {
  console.log('Request body:', req.body);

  const {username,email} = req.body;

  console.log('Username:', username);
  console.log('Email:', email);
  // const { username, email } = .body;

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (user) {
      // User found, handle accordingly
          mailer.sendVerificationEmail(user.username,user.email,true);          
          res.status(210).json({success:true, message:'Verification mail sent successfully'});
    } else {
      // If a user is not found, send a failure response with the message
res.status(404).json({ success: false, message: 'User not found' });

    }
  } catch (error) {
    // Handle any errors that occur during the query
   // If any errors occur during the process, send a failure response with the error message
res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;