const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const ResetPass = require('../../models/resetpass');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const router = express.Router();
const {Op} = require('sequelize');
const mailer = require('./SendMailer')
const {getAuth} = require("firebase-admin/auth");

// ...
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
});
client.connect();
router.post('/login', passport.authenticate('login', {session: false}), async (req, res, next) => {
    try {
        console.log(req.user.email)
        console.log(req.user.emailVerify);
        // verifying email verification if fase use resetpass model data to send mail
        if (req.user.emailVerify) {
            const body = {_id: req.user._id, email: req.user.email};
            const token = jwt.sign({user: body}, 'TOPSECRET');
            res.json({token});
        } else {
            console.log(req.user.email)
            const resetPass = await ResetPass.findOne({where: {username: req.user.username}});
            await mailer.sendVerificationEmail(req.user.username, req.user.email);
            // return res.json('verify email');
            res.status(403).json({success: false, message: 'Verify Email first. Check Email'});
        }
    } catch (error) {
        res.status(401).json({success: false, message: 'login failed'});
    }
});

// router.get(
//     '/getUser',
//     async function signInVerify(req, res) {
//         const token = req.body.accessToken;
//         console.log(token)
//         const authResult = await getAuth().verifyIdToken(token)
//         const userId = authResult.uid
//         if(userId){
//             console.log(userId)
//             const query = await user.find( {
//                 "uid" : userId
//             })
//
//             res.status(200).json({
//                 "data" : query
//             })
//         }else{
//             res.status(401).json({message:"Invalid Credentials"})
//         }
//     }
// )

router.get('/getUser', async function signInVerify(req, res) {
    const token = req.body.accessToken; // Access token from query parameter
    try {
        const authResult = await getAuth().verifyIdToken(token);
        const userId = authResult.uid;

        if (userId) {
            const query = `
        SELECT *
        FROM users
            `;
            client.query(query, (err, resp) => {
                if (err) {
                    console.warn(err);
                    return;
                }
                for (let row of resp.rows) {
                    console.log(row);
                }
                client.end();
            });
            res.status(200).json({
                data: query
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