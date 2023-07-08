const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model defined

const UserAuthorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Get the Authorization header
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header
    const { username, password } = req.body; // Get the username and password from the request body
console.log(req.body);
    if (!token && (!username || !password)) {
      return res.status(401).json({ error: 'Missing credentials' });
    }

    if (token) {
      // Token authentication
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
    } else {
      // Username/password authentication
      const user = await User.findOne({
        where: { username: username }
      });

      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      req.user = user; // Attach the user object to the request for further use
      next(); // Call the next middleware or route handler
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = UserAuthorization;
