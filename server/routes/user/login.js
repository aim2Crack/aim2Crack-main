const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const ResetPass = require('../../models/resetpass');

const passport = require('passport');
const jwt = require('jsonwebtoken');
// const router = express.Router();
const { Op } = require('sequelize');
const mailer=require('./SendMailer')
// ...

router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  async (req, res, next) => {
    try {
      console.log(req.user.email)
      console.log(req.user.emailVerify);
      // verifying email verification if fase use resetpass model data to send mail
      if(req.user.emailVerify){
        const body = { _id: req.user._id, email: req.user.email };
        const token = jwt.sign({ user: body }, 'TOP_SECRET');
        return res.json({ token });
      }else{
          console.log(req.user.email)
          const resetPass = await ResetPass.findOne({ where: { username:req.user.username } });
          mailer.sendVerificationEmail(req.user.email, resetPass.resetToken);
          // return res.json('verify email');
          res.status(500).json({success:false, message:'Verify Email first. Check Email'})
          }
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;