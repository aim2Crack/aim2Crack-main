const User = require('../../../../models/user');
const Quiz = require('../../../../models/quiz');

const newQuiz = async (details)=>{

  const { generatedLink,
    startTime, 
    marginTime,
    resultTime,
    quizName,
    sectionName,
    negativeMarking,
    preventMobile,
    allowTabchange,
  userId } = details;
  
  const newquiz = await Quiz.create({
    code: generatedLink,
    startTime,
    marginTime,
    resultTime,
    quizName,
    sectionName,
    negativeMarking,
    preventMobile,
    allowTabchange,
    creator: userId,
    collaborators: []
});
return newquiz;
}


// Check if the generated link exists in the "Quizzes" table
const findQuiz = async (code) =>{
const oldQuiz = await Quiz.findOne({
  where: {
    code: code,
  },
});
return oldQuiz;
}

const findallQuiz = async (reqId) =>{

const user = await User.findByPk(reqId);
        if (user) {
            const quizzes = await Quiz.findAll({
                where: { userId: reqId },
            });
            if (!quizzes) throw new Error('Unable to find quizzes.');
            return quizzes;
        } else {
            throw new Error('User not found');
                
        }
      }


module.exports = {
  newQuiz,
  findQuiz,
  findallQuiz
}