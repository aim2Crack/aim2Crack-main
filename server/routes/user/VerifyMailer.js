const express = require('express');
const ResetPass = require('../../models/resetpass');
const User=require('../../models/user');
const router = express.Router();

router.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;

    const resetPass = await ResetPass.findOne({ where: { resetToken: token } });
    const user = await User.findOne({ where: { username: resetPass.username } });
    console.log(resetPass);
    if (resetPass && resetPass.resetTokenExpiration > Date.now()) {

      if (resetPass.resetToken === token) {
        res.status(200).json({ success: true, message: 'Email successfully verified!' });
        user.emailVerify = true;
        await user.save();
        // if (user.emailVerify === false) {
        //   // await ResetPass.destroy({ where: { resetToken: token } });
          
        // }
      } else {
        res.json({ success: false, message: 'Verification failed. Token not available.' });
      }
    } else {
      res.json({ success: false, message: 'Verification failed. Token Expired' });
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    res.json({ success: false, message: 'An error occurred while verifying the email.' });
  }
});


module.exports = router;