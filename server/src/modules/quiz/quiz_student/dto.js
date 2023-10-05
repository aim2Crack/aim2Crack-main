const QuizOrderArray = require('../../../../models/quizorderarray');
const QuizQuestion = require('../../../../models/quizquestion')
const StudentAnswer = require('../../../../models/studentans');
const StudentResult = require('../../../../models/studentresult');

const findOrderArrayById = async (quizOrderId) =>{
  const orderArray = await QuizOrderArray.findByPk(quizOrderId);
  return orderArray;
  }

  const findOrderArrayByUser = async (user,quiz) =>{
    const quizOrder = await QuizOrderArray.findOne(
      {
        where: {studentId:user.id, quizId:quiz.id}
      }  
    )
    return quizOrder;
    }

const findQuestion = async (questionId) =>{
  const quizQuestion = await QuizQuestion.findOne({
    where: { id: questionId },
    attributes: ['question', 'questionType', 'options', 'questionTime', 'mark'],
  });
  if (!quizQuestion) throw new Error('Unable to find question.');
  return quizQuestion;

}

const createOrderArray = async (details) =>{
 const{quiz,user, randomQuestionIds, index} = details;  
  const quizOrder = await QuizOrderArray.create({
    quizId: quiz.id,
    studentId: user.id,
    questionOrder: randomQuestionIds,
    index:index,
    firstQues: true
  });
  if (!quizOrder) throw new Error('Unable to find order array.');
  return quizOrder;
}

const saveAnswer =  async(details) =>{

const {quizOrder, user, answer, timeElapsed, score}=details;
  const studentAnswer = StudentAnswer.create({
    questionId: quizOrder.dataValues.questionOrder[currentIndex],
    studentId: user.id,
    answer: answer,
    timeElapsed: timeElapsed,
    score:score,
    quizId: quizOrder.quizId,
  });
return studentAnswer;
}

const updateEndQuiz = async (quizOrder)=>{
  await QuizOrderArray.update(
    { status: false},
    { where: { id: quizOrder.id } }
  );
  return true;
}

const findStudentAnswer = async (quiz, user)=>{
  const allStudentAnswer = await StudentAnswer.findAll(
    {where:{
      quizId:quiz.id, 
      studentId:user.id}})
      return allStudentAnswer;
}

const updateScore = async (studentAnsId, score)=>{
  await StudentAnswer.update(
    { score: score },
    { where: { id: studentAnsId } }
  );
  return true;
}

const findAanswer = async(questionId) =>{
  await StudentAnswer.findOne(
    {where:{
      questionId:questionId
    }
  });
  return StudentAnswer;
}

const findQuizResult = async(quiz,user) =>{
  finalResult = await StudentResult.findOne({
    where: { quizId: quiz.id, studentId: user.id },
  });
  return finalResult;
}

const findQuizByUser = async(user) =>{
  allQuiz = await StudentResult.findAll({
    where: {studentId: user.id },
  });
  return allQuiz;
}




const createResult = async(details)=>{

  const {user, quiz, totalScore,correctlyAnswered,wronglyAnswered, unattempted}=details;
  const finalResult = await StudentResult.create({
    studentId: user.id,
    quizId: quiz.id,
    totalScore:totalScore,
    totalCorrect: correctlyAnswered,
    totalWrong: wronglyAnswered,
    totalUnattempt: unattempted,
  });
return finalResult;

}

const deleteResult = async(quiz, user)=>{

  await StudentResult.destroy({
    where: {
      studentId: user.id,
    quizId: quiz.id,
    },
  });
  return true;
}

  module.exports = {
  findOrderArrayById,
  findOrderArrayByUser,
  findQuestion,
  createOrderArray,
  saveAnswer,
  updateEndQuiz,
  findStudentAnswer,
  updateScore,
  findAanswer,
  findQuizResult, 
  createResult,
  deleteResult,
  findQuizByUser
}