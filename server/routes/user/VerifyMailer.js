const express = require('express');
const ResetPass = require('../../models/resetpass');
const User=require('../../models/user');
const router = express.Router();

router.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;

    const resetPass = await ResetPass.findOne({ where: { resetToken: token } });
    const user = await User.findOne({ where: { email: resetPass.email } });
    console.log(resetPass);
    if (resetPass && resetPass.resetTokenExpiration > Date.now()) {

      if (resetPass.resetToken === token & resetPass.passwordReset == false) {
        res.status(200).json({ success: true, message: 'Email successfully verified!' });
        user.emailVerify = true;
        await user.save();
        // if (user.emailVerify === false) {
        //   // await ResetPass.destroy({ where: { resetToken: token } });
          
        // }
      }else if(resetPass.resetToken === token & resetPass.passwordReset==true){
        console.log(resetPass)
        res.status(210).json({ success: true, message: 'Email verified!' });
        resetPass.passwordReset = false;
        await resetPass.save();
      } 
      
      
      
      else {
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