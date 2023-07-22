const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const Quiz = require('../models/quiz');
const UserAuthorization = require('./authorisation');
const QuizQuestion = require('../model/quizquestion');


const QuizTimeValidator = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Get the Authorization header
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }


    const decoded = jwt.verify(token, 'TOPSECRET', { ignoreExpiration: true });

    const email = decoded.user.email;
    // console.log(email);
    const taker = await User.findOne({
      where: { email: email }
    });
    // console.log(taker);
    if (taker.profileType != 'student') {
      return res.status(401).json({ error: 'The login profile is not faculty profile' });
    }

    const {code} = req.params; // Assuming the quiz ID is provided in the request parameters
    // console.log(code);
    const quiz = await Quiz.findOne({
      where: { code: code}
    });
    // console.log(quiz);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    req.user=taker;
    req.quiz = quiz; // Attach the user object to the request for further use
    const quizquestions = await QuizQuestion.findAll({
      where: { code: code}
    });
    let tt=0;
    for (each in quizquestions)
    {
      tt=tt+each.QuestionTime;
    }
    console.log(tt);
    if (now > tt+quiz.marginTime){
      return res.status(404).json({ error: 'Time exceeded' });
    }
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = QuizTimeValidator;
