
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('passport');
const mailer=require('./SendMailer')
const crypto = require('crypto');
const ResetPass = require('../../models/resetpass');

// //get all users
router.get('/users', async (req, res) => {
    try {
        // const UserModel = await User();
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
     const {username,email} = req.body;
    //  console.log(username);
     const resetToken = crypto.randomBytes(20).toString('hex');
    // console.log(resetToken);
//       // Store the token and its expiration in the user's record in the database
     const resetTokenExpiration = new Date(Date.now() + 3600000); // Token expires in 1 hour

      try {
//       // Save the user's record to the database
      const resetPass = await ResetPass.create({
        username: username,
        email: email,
        resetToken: resetToken,
        resetTokenExpiration,
      });
      // console.log(resetPass);
//        // Send the verification email
      mailer.sendVerificationEmail(email, resetToken);
      
  res.status(200).json({ success: true, message: 'User Created and Email Sent to registered Id for verification' });
     } catch (error) {
      console.error('Error storing reset token:', error);
      res.status(500).json({ success:false, error: 'An error occurred while storing the reset token.' });
    }

  }
);

module.exports = router;
