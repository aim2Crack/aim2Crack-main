
const express = require('express');
const router = express.Router();
const passport = require('passport');
const mailer=require('./SendMailer')
const ResetPass = require('../../models/resetpass');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const authorization = require ('../../controllers/authorisation');


// //get all users
router.get('/users',authorization, async (req, res) => {
    try {
             const user=req.user;
        // console.log(user);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/users', authorization, async (req, res) => {
  try {
   
    const user=req.user;
    const email = user.email;
     
    console.log(email); // Extract the user ID from the decoded token
   
    const userData = req.body; // Get the updated user data from the request body
    console.log(userData);
   // Update the user in the database based on email or username
   try {
    const updatedUser = await User.update(userData, {
      where: {
        email: email,
      },
      returning: true,
    });
    console.log(updatedUser); // Access the updated user record
  } catch (error) {
    console.error('Error updating user:', error.message);
  }

    console.log('data updated')
    // Return the updated user as the response
    res.status(200).json({success:true,message:'Data updated'});
  } catch (error) {
    // Handle any errors that occur during user update
    res.status(400).json({ error: error.message });
  }
});

router.put('/users', authorization, async (req, res) => {
  try {
   
    const user=req.user;
    const email = user.email;
     
    console.log(email); // Extract the user ID from the decoded token
   
    const userData = req.body; // Get the updated user data from the request body
    console.log(userData);
   // Update the user in the database based on email or username
   try {
    const updatedUser = await User.update(userData, {
      where: {
        email: email,
      },
      returning: true,
    });
    console.log(updatedUser); // Access the updated user record
  } catch (error) {
    console.error('Error updating user:', error.message);
  }

    console.log('data updated')
    // Return the updated user as the response
    res.status(200).json({success:true,message:'Data updated'});
  } catch (error) {
    // Handle any errors that occur during user update
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


router.post('/signup', (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    // Check if there's a message in the `info` object
    if (info && info.message) {
      // Send the message to the frontend
      console.log(info);
      console.log(info.message);
      return res.status(400).json({ success: false, message: info.message });
    }

    // At this point, user registration is successful.
    // You can send any other necessary response data to the frontend.

    const { username, email } = req.body;

    // Send the verification email
    try {
      mailer.sendVerificationEmail(username, email, false);

      return res.status(200).json({
        success: true,
        message: 'User Created and Email Sent to registered Id for verification',
      });
    } catch (error) {
      console.error('Error storing reset token:', error);
      return res
        .status(500)
        .json({ success: false, error: 'An error occurred while storing the reset token.' });
    }
  })(req, res, next);
});


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
