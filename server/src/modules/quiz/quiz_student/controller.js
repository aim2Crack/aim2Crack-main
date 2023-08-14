const express = require('express');
const router = express.Router();
const QuizAuthorization = require('../../../controllers/quizAuthorisation');
const StudentResult = require('../../../models/studentresult');
const StudentAnswer = require('../../../models/studentans');
const StudentAuthorization = require('../../../controllers/studentAuthorisation');
const FacultyAuthorization = require('../../../controllers/facultyAuthorisation');

const getStudentResultSummary = async (req, res) => {
    try {
        const quiz = req.quiz;
        const user = req.user;
        const summaryResults = await StudentAnswer.findAll({
            where: { quizId: quiz.id },
        });

        res.status(200).json({ success: true, data: summaryResults });
    } catch (error) {
        console.error('Error fetching student results:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = { getStudentResultSummary }