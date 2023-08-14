const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const Quiz = require('../models/quiz');
const UserAuthorization = require('./authorisation');


const QuizAuthorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Get the Authorization header
    const token = authHeader?.split(' ')[1]; // Extract the token from the Authorization header
    console.log(token);

    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }

    const decoded = jwt.verify(token, 'TOPSECRET', { ignoreExpiration: true });

    const email = decoded.user.email;
    const user = await User.findOne({
      where: { email: email }
    });
    // console.log(user);
    if (user.profileType != 'faculty') {
      return res.status(401).json({ error: 'The login profile is not faculty profile' });
    }

    const {code} = req.params; // Assuming the quiz ID is provided in the request parameters
    console.log(code);
    const quiz = await Quiz.findOne({
      where: { code: code, userId: user.id }
    });
    console.log(quiz);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    req.user=user;
    req.quiz = quiz; // Attach the user object to the request for further use
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = QuizAuthorization;
