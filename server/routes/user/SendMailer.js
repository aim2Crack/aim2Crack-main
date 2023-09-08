// const nodemailer = require('nodemailer');
// // const User = require('../../models/user');
// require('dotenv').config();
// const ResetPass = require('../../models/resetpass');
// const User = require('../../models/user');
// const crypto = require('crypto');


// // Create a transporter using your email service provider's SMTP settings
// const transporter = nodemailer.createTransport({
//   service:'gmail',
//   auth: {
//     user: 'aim2crack@gmail.com',
//     pass: 'wexjppcxdxsnlzqe',
//   },
// });




// // Function to send the verification email
// const sendVerificationEmail = async (username, recipientEmail,status) => {

//   const resetToken = crypto.randomBytes(20).toString('hex');
//   const resetTokenExpiration = new Date(Date.now() + 60000); // Token expires in 1o minutes
// const user= User.findOne({where: {username:username}}) ; 
// try{
//    // Find and delete the existing resetPass record for the username
//    await ResetPass.destroy({ where: { username: username } });

//    if (!recipientEmail)
//    {
//     recipientEmail=user.email;
//    }

//    // Create a new resetPass record

//     const resetPass = await ResetPass.create({
//       username: username,
//       email: recipientEmail ,
//       resetToken: resetToken,
//       resetTokenExpiration,
//       passwordReset: status,
//     });
//     console.log(resetPass);
  
//     const mailOptions = {
//         from: 'aim2crack@gmail.com',
//         to: recipientEmail,
//         subject: 'Email Verification',
//         text: `Click the following link to verify your email:  ${process.env.BASE_URL}/verify/${resetToken}`,
//       };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending verification email:', error);
//     } else {
//       console.log('Verification email sent:', info.response);
//     }
//   });
// }catch(error){
//   console.error('Error saving resetPass:',error);
// }
// };

// module.exports = {
//   sendVerificationEmail,
// };
