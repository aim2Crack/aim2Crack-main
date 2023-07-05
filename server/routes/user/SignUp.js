
const express = require('express');
const router = express.Router();
const passport = require('passport');
const mailer=require('./SendMailer')
const ResetPass = require('../../models/resetpass');
const User = require('../../models/user');

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
          // Send the verification email
      try{
          mailer.sendVerificationEmail(username, email,false);
      
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
