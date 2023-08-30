const User = require('./models/user'); // Assuming you have a User model defined
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authentication(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    console.log(req.user); // Store the user object in the request for later use
    next(); // Proceed to the next middleware/route handler
  });
}

module.exports = authentication;
