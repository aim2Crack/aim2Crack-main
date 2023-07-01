
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

router.delete('/users', async (req, res) => {
  try {
    const { token } = req.params;

    // Delete the record based on the token value
    const deletedRows = await User.destroy({ where: { } });

    if (deletedRows > 0) {
      res.status(200).json({ success: true, message: 'Record deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Record not found' });
    }
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ success: false, message: 'An error occurred while deleting the record' });
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

router.delete('/resetpass', async (req, res) => {
  try {
    const { token } = req.query;

    // Delete the record based on the token value
    const deletedRows = await ResetPass.destroy({ where: { resetToken: token } });

    if (deletedRows > 0) {
      res.status(200).json({ success: true, message: 'Record deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Record not found' });
    }
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ success: false, message: 'An error occurred while deleting the record' });
  }
});




module.exports = router;
