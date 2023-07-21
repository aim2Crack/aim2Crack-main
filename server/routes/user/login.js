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
const { Client } = require('pg');
// const {getAuth} = require("firebase-admin/auth");
// const client = new Client({
//     user: "postgres",
//     host: "localhost",
//     database: "postgres",
//     password: "1234",
//     port: 5432,
// });
// client.connect();
router.post('/login', passport.authenticate('login', {session: false}), async (req, res, next) => {
    try {
      // console.log(req.user.email)
      // console.log(req.user.emailVerify);
      // verifying email verification if fase use resetpass model data to send mail
      if(req.user.emailVerify){
        const body = { _id: req.user._id, email: req.user.email };
        const token = jwt.sign({ user: body },'TOPSECRET');
        console.log(token);
        res.json({ token });
      }else{
          console.log(req.user.email)
          const resetPass = await ResetPass.findOne({ where: { username:req.user.username } });
          mailer.sendVerificationEmail(req.user.username,req.user.email);
          // return res.json('verify email');
         res.status(403).json({success:false, message:'Verify Email first. Check Email'});
          }
    } catch (error) {
      res.status(401).json({success:false, message:'login failed'});
    }
});



router.get('/getUser', async function signInVerify(req, res) {
    const token = req.query.accessToken; // Access token from query parameter
    try {
        const authResult = await getAuth().verifyIdToken(token);
        const email = authResult.email

        if (email) {
            const query = `SELECT * FROM users WHERE email = '${email}'`;
            client.query(query, (err, resp) => {
                if (err) {
                    console.warn(err);
                    return;
                }
                for (let row of resp.rows) {
                    console.log(row);
                }
                return query
                // client.end();
            });
            res.status(200).json({
                user: query
            });
        } else {
            res.status(401).json({
                message: "Invalid Credentials"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
});


module.exports = router;