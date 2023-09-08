// const QuizQuestion = require('../../../models/quizquestion');
// const QuizOrderArray = require('../../../models/quizorderarray');
// // Helper function to retrieve the next question based on the current index
// async function getNextQuestion(quizOrderId, currentIndex) {
//   try {
//     const quizOrder = await QuizOrderArray.findByPk(quizOrderId);

//     if (!quizOrder) {
//       return null; // Quiz order not found
//     }
//     console.log('current indezx', currentIndex);
//     const { questionOrder } = quizOrder;
//     const totalQuestions = questionOrder.length;

//     if (currentIndex >= totalQuestions) {
//       return null; // No more questions left
//     }
//     const questionId = questionOrder[currentIndex];
//     console.log('questionId',questionId);
//     console.log('currentIndex', currentIndex);
//     const quizQuestion = await QuizQuestion.findOne({
//       where: { id: questionId },
//       attributes: ['question', 'questionType', 'options', 'questionTime', 'mark'],
//     });

//   // Extract the isCorrect property from each option string
//   const options = quizQuestion.dataValues.options.map(optionString => {
//     if (optionString){
//     const option = JSON.parse(optionString);
//     return option.value;
//     }
//   });

// // Create a sanitized quiz question object
// const sanitizedQuizQuestion = {
//   // id: quizQuestion.id,
//   question: quizQuestion.question,
//   options: options,
//   questionTime: quizQuestion.questionTime,
//   questionType:quizQuestion.questionType,
//   mark: quizQuestion.mark,
// };// return quizQuestion;
// // console.log(sanitizedQuizQuestion)
// return sanitizedQuizQuestion;

// } catch (error) {
//     console.error('Error getting next question:', error);
//     return null; // Return null on error
//   }
// }
// module.exports = {
//   getNextQuestion,
// };
