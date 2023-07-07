const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model defined

const UserAuthorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization; // Get the token from the request headers

    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }

    const decoded = jwt.verify(token, 'TOPSECRET', { ignoreExpiration: true });

    const email = decoded.user.email;
    const user = await User.findOne({
      where: { email: email }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user; // Attach the user object to the request for further use
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = UserAuthorization;
