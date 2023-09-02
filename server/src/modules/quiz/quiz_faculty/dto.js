const User = require('../../../../models/user');
const Quiz = require('../../../../models/quiz');
const QuizQuestion = require('../../../../models/quizquestion');

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

const verifyQuiz = async (code, user) =>{
  const foundQuiz = await Quiz.findOne({
    where: {
      code: code,
      userId: user.id 
    },
  });
  return foundQuiz;
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

const deleteQuizByCode = async(code)=>{
  // const quiz = await Quiz.findByPk(id);
  if (code) {
      await Quiz.destroy({
          where: {
            code: code,
          },
        });
      return true;
  } else {
    throw new Error('Quiz not found');

}
};

const getAllQuestions = async(quiz) =>{
if (quiz.id) {
  const allques = await QuizQuestion.findAll({
  where: { quizId:quiz.id},
   });
   return allques;
  }
else
{
  throw new Error('No Quiz Questions found');
}
}

const findQuestionById = async(quiz, id) =>{
  if (quiz && id) {
  const ques=QuizQuestion.findOne({ where: { quizId:quiz.id, id:id } });
  return ques
  }
  else
  {
    throw new Error('No Quiz Question found');
  }
  }
  
module.exports = {
  newQuiz,
  findQuiz,
  findallQuiz,
  deleteQuizByCode,
  verifyQuiz,
  getAllQuestions,
  findQuestionById
}