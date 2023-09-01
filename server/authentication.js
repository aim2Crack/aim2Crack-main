const User = require('./models/user'); // Assuming you have a User model defined
const jwt = require('jsonwebtoken');
const { findUser } = require('./src/modules/userManagement/dto');
require('dotenv').config();

async function authentication(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodedToken)
    const newuser = await findUser({ username:decodedToken.username, email: decodedToken.email });
    console.log(newuser)
    if (!newuser) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = newuser;
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.sendStatus(403); // Forbidden
  }
}

module.exports = authentication;
