const express = require('express');
const router = express.Router();
const StudentAuthorization = require('../../controllers/studentAuthorisation');
const StudentAnswer = require('../../models/studentans');
const User = require('../../models/user');
const QuizQuestion = require('../../models/quizquestion')

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

    console.log(quizQuestion);
    let score =0;
    if (quizQuestion)
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
router.get('/studentanswer/:quizId', StudentAuthorization, async (req, res) => {
  try {
    const quiz = req.quiz;

    // Fetch all student answers for the given quiz from the database
    const studentAnswers = await StudentAnswer.findAll({
      where: { quizId: quiz.id },
      include: [User],
    });

    res.status(200).json({ success: true, data: studentAnswers });
  } catch (error) {
    console.error('Error fetching student answers:', error);
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
