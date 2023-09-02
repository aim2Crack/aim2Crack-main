// const Quiz = require('../models/quiz');
const {findQuiz, verifyQuiz} = require('./dto');
// const User = require('../../../../models/user');
const { validateUserData, getUserDetails, sendVerificationEmail} = require('../../userManagement/helper');
const { createUser, findUser, updateUser, findResetDetails} = require('../../userManagement/dto');

// generate a unique link for the quiz
const generateUniqueLink = async () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';

  const generateRandomLink = () => {
    let link = '';
    for (let i = 0; i < 3; i++) {
      link += letters[Math.floor(Math.random() * letters.length)];
    }
    link += '-';
    for (let i = 0; i < 3; i++) {
      link += letters[Math.floor(Math.random() * letters.length)];
    }
    link += '-';
    for (let i = 0; i < 3; i++) {
      link += letters[Math.floor(Math.random() * letters.length)];
    }
   return link;
  };

  let generatedLink;
  let isLinkUnique = false;
  while (!isLinkUnique) {
    generatedLink = generateRandomLink();
    const existingQuiz = await findQuiz(generatedLink);
    if (!existingQuiz) {
      isLinkUnique = true;
    }
  }
  return generatedLink;
};

async function facultyCheck(req, res, next){
  try {
    user=req.user;
    if (user.profileType != 'faculty') {
      return res.status(401);
        }
    req.user = user; // Attach the user object to the request for further use
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Error in authorisation' });
  }
};

async function belongsToCheck(req, res, next){
  try {
    user=req.user;
    
    const {code} = req.params; // Assuming the quiz ID is provided in the request parameters
   
   const quiz = await verifyQuiz(code, user);
   console.log(quiz); 
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    req.user=user;
    req.quiz = quiz;
    // Attach the user object to the request for further use
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};



module.exports = {
generateUniqueLink,
facultyCheck,
belongsToCheck
};
