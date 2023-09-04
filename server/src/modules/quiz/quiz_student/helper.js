
const { findOrderArrayById, findQuestion } = require('./dto');

// Helper function to retrieve the next question based on the current index
async function getNextQuestion(quizOrderId, currentIndex) {
  try {
    const quizOrder = await findOrderArrayById(quizOrderId);
    if (!quizOrder) {
      return null; // Quiz order not found
    }
    console.log('current indezx', currentIndex);
    const { questionOrder } = quizOrder;
    const totalQuestions = questionOrder.length;

    if (currentIndex >= totalQuestions) {
      return false; // No more questions left
    }
    const questionId = questionOrder[currentIndex];
    console.log('questionId',questionId);
    console.log('currentIndex', currentIndex);
    const quizQuestion = await findQuestion(questionId);
  const options = quizQuestion.dataValues.options.map(optionString => {
    if (optionString){
    const option = JSON.parse(optionString);
    return option.value;
    }
  });
const sanitizedQuizQuestion = {
  question: quizQuestion.question,
  options: options,
  questionTime: quizQuestion.questionTime,
  questionType:quizQuestion.questionType,
  mark: quizQuestion.mark,
};
return sanitizedQuizQuestion;
} catch (error) {
    console.error('Error getting next question:', error);
    return null; // Return null on error
  }
}


// Custom function to compare two arrays and check if they are equal
const areArraysEqual = (array1, array2) => {
    if (array1.length !== array2.length) return false;
    const frequencyMap = {};
    for (const element of array1) {
      frequencyMap[element] = (frequencyMap[element] || 0) + 1;
    }
    for (const element of array2) {
      if (!frequencyMap[element]) {
        // If an element in array2 doesn't exist in array1, arrays are not equal
        return false;
      }
      frequencyMap[element]--;
    }
    for (const element in frequencyMap) {
      if (frequencyMap[element] !== 0) {
        return false;
      }
    }
    return true;
  };
  
  // Function to calculate the total time for the quiz
  const calculateTotalTime = (questions) => {
    let totalTime = 0;
    for (const question of questions) {
      const questionTime = question.questionTime;
      totalTime += questionTime;
     }
    return totalTime;
  };
  
// Helper function to shuffle an array in place using Fisher-Yates algorithm
async function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
    
const calculateScore = async(quizQuestion, answer) =>{
    let score=0;
    // For single-choice questions, directly compare the selected answer with the correct answer
    if (quizQuestion.questionType == 'single' || quizQuestion.questionType == 'numerical' ) {
      if (quizQuestion.answer == answer[0]) {
        score = quizQuestion.mark;
        return score;
      }
    }
    
    // For multiple-choice questions, use the custom array comparison function to check if the answers match
    if (quizQuestion.questionType == 'multiple') {
      if (areArraysEqual(quizQuestion.answer, answer)) {
        score = quizQuestion.mark;
        return score;
      }
    }  

}



module.exports = {
  getNextQuestion,
  areArraysEqual,
  calculateTotalTime,
  shuffleArray,
  calculateScore
};
