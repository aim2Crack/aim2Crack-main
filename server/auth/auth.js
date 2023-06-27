const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const express = require('express');
// const router = express.Router();
const User = require('../models/user');
//const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Sequelize, Op } = require('sequelize');

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'username', // Assuming your email field is named 'email'
      passwordField: 'password', // Assuming your password field is named 'password'
      passReqToCallback: true, // Allowing to pass the entire request to the callback
    },
    async (req, username, password, done) => {
      try {
        // Check if the email is already taken
        const existingEmailUser = await User.findOne({ where: { email: req.body.email } });
        if (existingEmailUser) {
          return done(null, false, { message: 'Email already exists' });
        }

        // Check if the username is already taken
        const existingUsernameUser = await User.findOne({ where: { username } });
        if (existingUsernameUser) {
          return done(null, false, { message: 'Username already taken' });
        }
         // Hash the password
         const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
          username,
          email: req.body.email,
          password: hashedPassword,
          phone: req.body.phone,
          profileType: req.body.profileType,
          rollNo: req.body.rollNo,
          institute: req.body.institute
        });

        // Return the new user object
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);












  // ...
  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'usernameOrEmail',
        passwordField: 'password'
      },
      async (usernameOrEmail, password, done) => {
        try {
          const user = await User.findOne({
            where: {
              [Op.or]: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
              ]
            }
          });
          console.log(usernameOrEmail);
          if (!user) {
            return done(null, false, { message: 'User not found' });
            }
            // console.log(message);
          const validate = await user.isValidPassword(password);
          // console.log(validate)
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
  
  // ...

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);