const User = require('../../../models/user');
const Quiz = require('../models/quiz');

const newQuiz = async ()=>{

  const quiz = await Quiz.create({
    code: generatedLink,
    startTime,
    marginTime,
    resultTime,
    quizName,
    sectionName,
    negativeMarking,
    preventMobile,
    allowTabchange,
    creator: user.id,
    collaborators: []
});

}


const getUserDetails = async (email) =>{
const user = await User.findOne({
    where: { email: email }
  });
}

module.exports = {getUserDetails}