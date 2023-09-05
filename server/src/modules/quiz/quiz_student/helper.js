
const StudentResult = require('../../../../models/studentresult');
const { getAllQuestions, findQuestionById } = require('../quiz_faculty/dto');
const { findOrderArrayById, findQuestion, findStudentAnswer, findAanswer, updateScore, findQuizResult, createResult, deleteResult } = require('./dto');

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
    
  const calculateScore = async (quiz, user) => {
    try {
      const allAnswers = await findStudentAnswer(quiz, user);
      console.log(allAnswers);
  
      for (const ans of allAnswers) {
        const ques = await findQuestionById(ans.dataValues.questionId);
        const answer = ans.dataValues.answer;
        let score = 0;
  
        // For single-choice questions or numerical questions, compare the selected answer with the correct answer
        if (ques.questionType === 'single' || ques.questionType === 'numerical') {
          if (ques.answer == answer[0]) {
            score = ques.mark;
            console.log(score);
            await updateScore(ans.dataValues.id, score); // Use ans.id to update the score for the specific answer
          }
        }
  
        // For multiple-choice questions, check if the answers match
        if (ques.questionType === 'multiple') {
          if (areArraysEqual(ques.answer, answer)) {
            score = ques.mark;
            console.log(score);
            await updateScore(ans.dataValues.id, score); // Use ans.id to update the score for the specific answer
          }
        }
      }
    } catch (error) {
      console.error('Error calculating and updating scores:', error);
    }
  };

 const generateResult = async (quiz,user)=>{
  try {
    const student = await findStudentAnswer(quiz, user);
    const totalScore = student.reduce((accumulator, answer) => {
      return accumulator + (answer.dataValues.score || 0);
    }, 0);
    
    console.log('Total Score:', totalScore);
    
    let correctlyAnswered = 0;
    let wronglyAnswered = 0;
    let unattempted = 0;
    
    for (const answer of student) {
      if (answer.dataValues.score > 0) {
        correctlyAnswered++;
      } else if (answer.dataValues.score === 0) {
        wronglyAnswered++;
      } else if (answer.dataValues.score === null || isNaN(answer.dataValues.score)) {
        unattempted++;
      }
    }
    
    const totalQuestions = correctlyAnswered + wronglyAnswered;
    const finalResult = await findQuizResult(quiz,user)
    if(finalResult)
    {
      // await deleteResult(quiz,user);
    }
    else
    {
      let newResult;
      newResult = await createResult({user, quiz, totalScore, correctlyAnswered, wronglyAnswered, unattempted});
      return newResult; 
    }
    return (finalResult)
      } catch (error) {
        console.error('Error fetching student result:', error);
      }
    };
    


module.exports = {
  getNextQuestion,
  areArraysEqual,
  calculateTotalTime,
  shuffleArray,
  calculateScore,
  generateResult
};
