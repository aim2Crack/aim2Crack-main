const express = require('express');
const router = express.Router();
const QuizAuthorization = require('../../controllers/quizAuthorisation');
const StudentResult = require('../../models/studentresult');

// Create a student result
router.post('/studentresult', QuizAuthorization, async (req, res) => {
  try {
    const { quizId, studentId, totalScore } = req.body;

    // Create a new student result in the database
    const studentResult = await StudentResult.create({
      quizId,
      studentId,
      totalScore,
    });

    res.status(201).json({ success: true, data: studentResult });
  } catch (error) {
    console.error('Error creating student result:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Get all student results for a quiz
router.get('/studentresult/:quizId', QuizAuthorization, async (req, res) => {
  try {
    const quiz = req.quiz;

    // Fetch all student results for the given quiz from the database
    const studentResults = await StudentResult.findAll({
      where: { quizId: quiz.id },
    });

    res.status(200).json({ success: true, data: studentResults });
  } catch (error) {
    console.error('Error fetching student results:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Get a student result by ID
router.get('/studentresult/:quizId/:id', QuizAuthorization, async (req, res) => {
  try {
    const quiz = req.quiz;
    const { id } = req.params;

    // Find a student result by ID for the given quiz in the database
    const studentResult = await StudentResult.findOne({
      where: { quizId: quiz.id, id },
    });

    if (studentResult) {
      res.status(200).json({ success: true, data: studentResult });
    } else {
      res.status(404).json({ success: false, message: 'Student result not found' });
    }
  } catch (error) {
    console.error('Error fetching student result:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Delete a student result by ID
router.delete('/studentresult/:quizId/:id', QuizAuthorization, async (req, res) => {
  try {
    const quiz = req.quiz;
    const { id } = req.params;

    // Find and delete a student result by ID for the given quiz in the database
    const studentResult = await StudentResult.findOne({ where: { quizId: quiz.id, id } });
    if (studentResult) {
      await studentResult.destroy();
      res.status(200).json({ success: true, message: 'Student result deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Student result not found' });
    }
  } catch (error) {
    console.error('Error deleting student result:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
