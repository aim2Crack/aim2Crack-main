const express = require('express');
const router = express.Router();
const StudentAuthorization = require('../../controllers/studentAuthorisation');
const StudentAnswer = require('../../models/studentans');
const User = require('../../models/user');
const QuizQuestion = require('../../models/quizquestion');
const QuizOrderArray = require('../../models/quizorderarray');

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
    console.log(code);

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

console.log(randomQuestionIds);
    const quizOrder = await QuizOrderArray.create({
      quizId: quiz.id,
      studentId: user.id,
      questionOrder: randomQuestionIds,
    });

    res.status(201).json({ success: true, data: quizOrder });
  } catch (error) {
    console.error('Error creating student answer:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Get a student answer by ID
router.get('/studentanswer/:quizId/:id', StudentAuthorization, async (req, res) => {
  try {
    const quiz = req.quiz;
    const { id } = req.params;

    // Find a student answer by ID for the given quiz in the database
    const studentAnswer = await StudentAnswer.findOne({
      where: { quizId: quiz.id, id },
      include: [User],
    });

    if (studentAnswer) {
      res.status(200).json({ success: true, data: studentAnswer });
    } else {
      res.status(404).json({ success: false, message: 'Student answer not found' });
    }
  } catch (error) {
    console.error('Error fetching student answer:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Delete a student answer by ID
router.delete('/studentanswer/:quizId/:id', StudentAuthorization, async (req, res) => {
  try {
    const quiz = req.quiz;
    const { id } = req.params;

    // Find and delete a student answer by ID for the given quiz in the database
    const studentAnswer = await StudentAnswer.findOne({ where: { quizId: quiz.id, id } });
    if (studentAnswer) {
      await studentAnswer.destroy();
      res.status(200).json({ success: true, message: 'Student answer deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Student answer not found' });
    }
  } catch (error) {
    console.error('Error deleting student answer:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
