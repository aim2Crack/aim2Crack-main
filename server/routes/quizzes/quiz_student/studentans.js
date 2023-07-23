const express = require('express');
const router = express.Router();
const StudentAuthorization = require('../../../controllers/studentAuthorisation');
const StudentAnswer = require('../../../models/studentans');
const User = require('../../../models/user');
const QuizQuestion = require('../../../models/quizquestion');
const QuizOrderArray = require('../../../models/quizorderarray');
const {getNextQuestion} = require('./getNextQuestion');

// Create a student answer
router.post('/studentanswer/:code', StudentAuthorization, async (req, res) => {
  try {
    const user = req.user;
    const quiz = req.quiz;
    
    const { code } = req.params;
    console.log(quiz);
    console.log(user);
    const { questionId, answer, submissionTime, sectionId } = req.body;

    const quizQuestion= await QuizQuestion.findByPk(questionId);
    if (!quizQuestion) {
      // If the quiz question with the given ID doesn't exist, return an error response
      return res.status(404).json({ success: false, message: 'Quiz question not found' });
    }

    console.log(quizQuestion.answer);
    console.log(answer);
    let score =0;
    if (quizQuestion.answer == answer)
    {
      score = quizQuestion.mark
    }
    console.log(score);
    // Create a new student answer in the database
    const studentAnswer = await StudentAnswer.create({
      quizId: quiz.id,
      studentId: user.id,
      questionId,
      answer,
      submissionTime,
      score,
      sectionId,
    });

    res.status(201).json({ success: true, data: studentAnswer });
  } catch (error) {
    console.error('Error creating student answer:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Get all student answers for a quiz
router.get('/studentanswer/:code', StudentAuthorization, async (req, res) => {
  try {
    const user = req.user;
    const quiz = req.quiz;
    
    const { code } = req.params;
    // console.log(quiz);
    // console.log(user);
    // console.log(code);

    const now = Date.now(); // Get the current timestamp in milliseconds

    // Check if the quiz time is up
    if (quiz.marginTime < now) {
      // If the quiz time is up, return an error response
      return res.status(404).json({ success: false, message: 'Time up' });
    }


    const quizQuestions= await QuizQuestion.findAll(
      {
        where :{ quizId: quiz.id},
      }
    );

    if (!quizQuestions || quizQuestions.length === 0) {
      // If no quiz questions were found for the given quiz ID, return an error response
      return res.status(404).json({ success: false, message: 'Quiz questions not found' });
    }
    
    const totalQuestions = quizQuestions.length;
    console.log(totalQuestions);
    
// Helper function to shuffle an array in place using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle the quizQuestions array randomly
shuffleArray(quizQuestions);

// Extract question IDs into a new array
const randomQuestionIds = quizQuestions.map((question) => question.id);

// console.log(randomQuestionIds);
    const quizOrder = await QuizOrderArray.create({
      quizId: quiz.id,
      studentId: user.id,
      questionOrder: randomQuestionIds,
    });
// Fetch the first question based on the currentIndex (which will be 0 initially)
const firstQuestion = await getNextQuestion(quizOrder.id, 0);

if (!firstQuestion) {
  // If no question is found, return an error response
  return res.status(404).json({ success: false, message: 'No questions found' });
}

// Send the first question details to the front end
res.status(201).json({ success: true, data: firstQuestion });
// send question and get answer.
    // res.status(201).json({ success: true, data: quizOrder });
  } catch (error) {
    console.error('Error creating student answer:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


router.post('/submitAnswer/:code/:quizOrderId/:currentIndex', StudentAuthorization, async (req, res) => {
  try {
    const user = req.user;
    const { quizOrderId, currentIndex } = req.params;
    const { answer, timeElapsed } = req.body;

    // Save the student's answer here, assuming you have a separate model for student answers
    // and you can save the answer along with the question ID, student ID, selectedOption, and timeTaken.
    const quizOrder = await QuizOrderArray.findByPk(quizOrderId);
    if (!quizOrder) {
      // If the quiz order with the given ID doesn't exist, return an error response
      return res.status(404).json({ success: false, message: 'Quiz order not found' });
    }
    console.log(quizOrder);
    const quizQuestion= await QuizQuestion.findByPk(quizOrder.questionOrder[currentIndex]);
    console.log(quizQuestion);

    if (!quizQuestion) {
      // If the quiz question with the given ID doesn't exist, return an error response
      return res.status(404).json({ success: false, message: 'Quiz question not found' });
    }

    // console.log(quizQuestion.answer);
    console.log(answer);
    let score =0;
    if (quizQuestion.answer == answer)
    {
      score = quizQuestion.mark
    }
    console.log(score);
    const studentAnswer = StudentAnswer.create({
      questionId: quizOrder.dataValues.questionOrder[currentIndex],
      studentId: user.id,
      answer,
      timeElapsed,
      score,
    });

    // Increment the currentIndex for the next question
    const nextIndex = parseInt(currentIndex, 10) + 1;

    // Get the next question based on the new index
    const nextQuestion = await getNextQuestion(quizOrderId, nextIndex);

    if (!nextQuestion) {
      return res.status(404).json({ success: false, message: 'No more questions left' });
    }

    // Send the next question details to the front end
    res.status(200).json({ success: true, data: nextQuestion });
  } catch (error) {
    console.error('Error saving answer and getting next question:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


module.exports = router;
