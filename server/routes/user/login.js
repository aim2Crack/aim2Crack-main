const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const router = express.Router();
const { Op } = require('sequelize');
// ...

router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  async (req, res, next) => {
    try {
      console.log(req.user.email);
      const body = { _id: req.user._id, email: req.user.email };
      const token = jwt.sign({ user: body }, 'TOP_SECRET');
      return res.json({ token });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;