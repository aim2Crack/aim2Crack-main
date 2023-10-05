const User = require('./models/user'); // Assuming you have a User model defined
const jwt = require('jsonwebtoken');
const { findUser } = require('./src/modules/userManagement/dto');
require('dotenv').config();

async function authentication(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    console.log('notoken');
    return res.sendStatus(401); // Unauthorized
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const newuser = await findUser({ username:decodedToken.username, email: decodedToken.email });
    if (!newuser) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = newuser;
    // console.log(req.user);
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.sendStatus(403); // Forbidden
  }
}

module.exports = authentication;
