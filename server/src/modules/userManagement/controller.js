const { validateUserData, getUserDetails, sendVerificationEmail} = require('./helper');
const { createUser, findUser, findResetDetails} = require('./dto');
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
  

const verifymail = async (req, res) => {
    try {
      const { token } = req.query;
      const resetPass = await findResetDetails(token); 
      const user = await findUser({email:resetPass.email}); 
      if (resetPass.resetToken == token) {
        if (resetPass.passwordReset == false && user.emailVerify == false) {
          user.emailVerify = true;
          await user.save();
          res.status(250).json({ success: true, message: 'Email successfully verified!' });
        } else if (resetPass.passwordReset == false && user.emailVerify == true) {
          res.status(250).json({ success: true, message: 'Email already Verified' });
        } else if (resetPass.passwordReset == true) {
          res.status(210).json({ success: true, message: 'Email verified for password reset!' });
          resetPass.passwordReset = false;
          await resetPass.save();
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
  };


const forgotpassword = async (req, res) => {  
    const {username,email} = req.body;
    try {
      const user = await findUser({ username, email });
      if (user) {
             await sendVerificationEmail(user.username,user.email,true);          
            res.status(210).json({success:true, message:'Verification mail sent successfully'});
      } else {
        // If a user is not found, send a failure response with the message
        throw new Error('User not found!');
     }
    } catch (error) {
      // Handle any errors that occur during the query
     // If any errors occur during the process, send a failure response with the error message
  res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };




  module.exports = {
    signin,
    signup,
    verifymail,
    forgotpassword
  }