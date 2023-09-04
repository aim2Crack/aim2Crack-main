const QuizOrderArray = require('../../../../models/quizorderarray');
const QuizQuestion = require('../../../../models/quizquestion')
const StudentAnswer = require('../../../../models/studentans');

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


  module.exports = {
  findOrderArrayById,
  findOrderArrayByUser,
  findQuestion,
  createOrderArray,
  saveAnswer,
  updateEndQuiz
}