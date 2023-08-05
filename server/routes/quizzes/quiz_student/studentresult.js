const express = require('express');
const router = express.Router();
const QuizAuthorization = require('../../../controllers/quizAuthorisation');
const StudentResult = require('../../../models/studentresult');
const StudentAnswer = require('../../../models/studentans');
const StudentAuthorization = require('../../../controllers/studentAuthorisation');
const FacultyAuthorization = require('../../../controllers/facultyAuthorisation');

// Create a student result
// router.post('/studentresult', QuizAuthorization, async (req, res) => {
//   try {
//     const { quizId, studentId, totalScore } = req.body;

//     // Create a new student result in the database
//     const studentResult = await StudentResult.create({
//       quizId,
//       studentId,
//       totalScore,
//     });

//     res.status(201).json({ success: true, data: studentResult });
//   } catch (error) {
//     console.error('Error creating student result:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });

// // Get all student results for a quiz
router.get('/studentresult/:code/all', QuizAuthorization, async (req, res) => {
  try {
    const quiz = req.quiz;
    const user = req.user;

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

// Generating result for each student once the student complets the quiz
router.get('/studentresult/:code', StudentAuthorization, async (req, res) => {
  try { 
    const quiz = req.quiz;
    const user= req.user;
// console.log(quiz)
    // obtaining all the objects corresponding to a quiz
    const student = await StudentAnswer.findAll({
      where: { quizId: quiz.id, studentId: user.id },
    });

// Assuming 'student' is an array of objects representing the student's answers
// Each answer object has a 'score' property representing the score for that answer



const totalScore = student.reduce((accumulator, answer) => {
  // 'answer.score' is the score property in each answer object
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
console.log('Correctly Answered:', correctlyAnswered);
console.log('Wrongly Answered:', wronglyAnswered);
console.log('Unattempted:', unattempted);
console.log('Total Questions:', totalQuestions);

finalResult = await StudentResult.findOne({
  where: { quizId: quiz.id, studentId: user.id },
});
if(!finalResult)
{
      finalResult = await StudentResult.create({
      studentId: user.id,
      quizId: quiz.id,
      totalScore:totalScore,
      totalCorrect: correctlyAnswered,
      totalWrong: wronglyAnswered,
      totalUnattempt: unattempted,
    });
  }

    if (finalResult) {
      res.status(200).json({ success: true, message:'total marks calculated', data: finalResult});
    } else {
      res.status(404).json({ success: false, message: 'Student result not found' });
    }
  } catch (error) {
    console.error('Error fetching student result:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Delete a student result by ID
// router.delete('/studentresult/:quizId/:id', QuizAuthorization, async (req, res) => {
//   try {
//     const quiz = req.quiz;
//     const { id } = req.params;

//     // Find and delete a student result by ID for the given quiz in the database
//     const studentResult = await StudentResult.findOne({ where: { quizId: quiz.id, id } });
//     if (studentResult) {
//       await studentResult.destroy();
//       res.status(200).json({ success: true, message: 'Student result deleted successfully' });
//     } else {
//       res.status(404).json({ success: false, message: 'Student result not found' });
//     }
//   } catch (error) {
//     console.error('Error deleting student result:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });

module.exports = router;
