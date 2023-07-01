const express = require('express');
const ResetPass = require('../../models/resetpass');
const User=require('../../models/user');
const router = express.Router();

router.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;

    const resetPass = await ResetPass.findOne({ where: { resetToken: token } });
    const user = await User.findOne({ where: { username: resetPass.username } });

    if (resetPass && resetPass.resetTokenExpiration > Date.now()) {
      if (resetPass.resetToken === token) {
        res.status(200).json({ success: true, message: 'Email successfully verified!' });

        if (user.emailVerify === false) {
          // await ResetPass.destroy({ where: { resetToken: token } });
          user.emailVerify = true;
          await user.save();
        }
      } else {
        res.status(400).json({ success: false, message: 'Verification failed. Token not available.' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Verification failed. Token Expired' });
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ success: false, message: 'An error occurred while verifying the email.' });
  }
});


module.exports = router;
