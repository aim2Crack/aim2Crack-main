const express = require('express');
const ResetPass = require('../../models/resetpass');
const router = express.Router();

router.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;
    // console.log(token);

    const resetPass = await ResetPass.findOne({ where: { resetToken: token } });
    // console.log(resetPass);

    if (resetPass && resetPass.resetTokenExpiration > Date.now()) {
      // Valid reset token
      await ResetPass.delete({ where: { id: resetPass.id } });
      res.status(200).json({ success: true, message: 'Email successfully verified!' });
     
    } else {
      // Invalid or expired reset token
      res.status(500).json({ success: false, message: 'Verification failed. Please try again.' });
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(501).json({ success: false, message: 'An error occurred while verifying the email.' });
  }
});

module.exports = router;
