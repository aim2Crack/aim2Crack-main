const { validateUserData, getUserDetails, sendVerificationEmail} = require('./helper');
const { createUser, findUser, updateUser, findResetDetails} = require('./dto');
require('dotenv').config();


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signin = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const user = await findUser({ username: usernameOrEmail, email: usernameOrEmail });
        if (!(user)) {
          throw new Error('User not found! Signup!');
      }
        if (!(await bcrypt.compare(password, user.password))) {
          throw new Error('Password is wrong.');
      }
        if (user.emailVerify ==false) {
          throw new Error('Please verify email. Check registered mail inbox!!');
        }
        const userDetails = await getUserDetails(user);
        const token = jwt.sign(userDetails, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.json({ user, token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const signup = async (req, res) => {
    try {
      const userDetails = await validateUserData(req.body);
      const user = await createUser(userDetails);
      try {
        const mailer = await sendVerificationEmail(user.username, user.email, false)
        return res.status(200).json({
          success: true,
          message: 'User Created and Email Sent to registered Id for verification',
        });
      } catch (error) {
        console.error('Error sending mail:', error);
        return res.status(500).json({ success: false, error: 'An error occurred.' });
      }
    } catch (error) {
      // Handle validation errors here
      console.error('Validation error:', error);
      return res.status(400).json({ success: false, error: error.message });
    }
  };
  

  const updateuserdetails = async (req, res) => {
    try {
      const {token} = req.query;
      if (token)
      {
        const pass = req.body; // Get the updated user data from the request body
        const user = await findResetDetails(token);
        const newuser =  await updateUser({password:pass.password, email:user.email});
        return res.status(200).json({ success: true, message: 'Details updated' });
      }
      else{

      }
      
    } catch (error) {
      // Handle validation errors here
      console.error('Validation error:', error);
      return res.status(400).json({ success: false, error: error.message });
    }
  };



  const verifymail = async (req, res) => {
    try {
      const { token } = req.query;
      const resetPass = await findResetDetails(token); 
      const user = await findUser({ username: null, email: resetPass.email });
      
      const resetTokenExpirationTimestamp = new Date(resetPass.resetTokenExpiration);
      const currentTimestamp = Date.now();

      if (resetPass.resetToken === token && resetTokenExpirationTimestamp > currentTimestamp)
       {
        if (!resetPass.passwordReset) {
          if (!user.emailVerify) {
            user.emailVerify = true;
            await user.save();
            res.status(250).json({ success: true, message: 'Email successfully verified!' });
          } else {
            res.status(251).json({ success: true, message: 'Email already verified.' });
          }
        } else {
          resetPass.passwordReset = false;
          await resetPass.save();
          res.status(210).json({ success: true, message: 'Email verified for password reset!' });
        }
      } else {
        res.status(400).json({ success: false, message: 'Verification failed. Token expired or invalid.' });
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({ success: false, message: 'An error occurred while verifying the email.' });
    }
  };
  

const forgotpassword = async (req, res) => {  
    const {username,email} = req.body;
    try {
      const user = await findUser({ username, email });
      if (user) {
             await sendVerificationEmail(user.username,user.email,true);          
            res.status(210).json({success:true, message:'Verification mail sent successfully'});
      } else {
        throw new Error('User not found!');
     }
    } catch (error) {
     return res.status(400).json({ error: error.message });
    }
  };




  module.exports = {
    signin,
    signup,
    verifymail,
    forgotpassword,
    updateuserdetails
  }