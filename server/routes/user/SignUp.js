
const express = require('express');
const router = express.Router();
const passport = require('passport');
const mailer = require('./SendMailer')
const ResetPass = require('../../models/resetpass');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const authorization = require('../../controllers/authorisation');


router.get('/users', authorization, async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/users', authorization, async (req, res) => {
  try {

    const user = req.user;
    const email = user.email;
    const userData = req.body;
    await User.update(userData, {
      where: {
        email: email,
      },
      returning: true,
    });
    res.status(200).json({ success: true, message: 'Data updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/users', authorization, async (req, res) => {
  try {

    const user = req.user;
    const email = user.email;
    const userData = req.body;
    try {
      const updatedUser = await User.update(userData, {
        where: {
          email: email,
        },
        returning: true,
      });
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
    res.status(200).json({ success: true, message: 'Data updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/users', async (req, res) => {
  try {
    const { token } = req.params;
    const deletedRows = await User.destroy({ where: {} });

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
    const { username, email } = req.body;
    try {
      mailer.sendVerificationEmail(username, email, false);

      res.status(200).json({ success: true, message: 'User Created and Email Sent to registered Id for verification' });
    } catch (error) {
      console.error('Error storing reset token:', error);
      res.status(500).json({ success: false, error: 'An error occurred while storing the reset token.' });
    }

  }
);

router.delete('/resetpass', async (req, res) => {
  try {
    const { token } = req.query;
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
