const QuizQuestion = require('../../../models/quizquestion');
const QuizOrderArray = require('../../../models/quizorderarray');
// Helper function to retrieve the next question based on the current index
async function getNextQuestion(quizOrderId, currentIndex) {
  try {
    const quizOrder = await QuizOrderArray.findByPk(quizOrderId);

    if (!quizOrder) {
      return null; // Quiz order not found
    }

    const { questionOrder } = quizOrder;
    const totalQuestions = questionOrder.length;

    if (currentIndex >= totalQuestions) {
      return null; // No more questions left
    }
    const questionId = questionOrder[currentIndex];
    const quizQuestion = await QuizQuestion.findOne({
      where: { id: questionId },
      attributes: ['id', 'question', 'options', 'questionTime', 'mark'],
    });

    return quizQuestion;
  } catch (error) {
    console.error('Error getting next question:', error);
    return null; // Return null on error
  }
}
module.exports = {
  getNextQuestion,
};
