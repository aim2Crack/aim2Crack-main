const express = require('express');
const router = express.Router();
const Quiz = require('../../../models/quiz');
const FacultyAuthorization = require('../../../controllers/facultyAuthorisation');
const authorization = require('../../../controllers/authorisation');
const generateLink = require('../../../controllers/generateLink');
const User = require('../../../models/user');
const QuizAuthorization = require('../../../controllers/quizAuthorisation');

// Create a quiz
router.post('/quizzes', FacultyAuthorization, async (req, res) => {
    const user = req.user;
    console.log(user.id);
    try {
        const { startTime, marginTime, resultTime, quizName, sectionName, negativeMarking, preventMobile, allowTabchange } = req.body;
        const generatedLink = await generateLink();
        // Create a new quiz in the database
        const quiz = await Quiz.create({
            code: generatedLink,
            startTime,
            marginTime,
            resultTime,
            quizName,
            sectionName,
            negativeMarking,
            preventMobile,
            allowTabchange,
            creator: user.id,
            collaborators: []
        });
        await quiz.setUser(user);
        res.status(201).json({ success: true, data: quiz });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Get all quizzes with modifiedDate and quizName
router.get('/quizzes', FacultyAuthorization, async (req, res) => {
    try {
        const reqId = req.user.id;
        console.log(reqId);
        const user = await User.findByPk(reqId);
        if (user) {
            const allQuizzes = await Quiz.findAll({
                where: { userId: reqId },
            });

            // Fetch all quizzes from the database with modifiedDate and quizName
            const quizzes = await Promise.all(
                allQuizzes.map(async (quiz) => {
                    const { modifiedDate, quizName } = quiz;
                    return {
                        id: quiz.id,
                        modifiedDate,
                        quizName,
                        // Add other relevant properties from the quiz if needed
                    };
                })
            );

            res.status(200).json({ success: true, data: quizzes });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Access quiz by id
router.get('/quizzes/:code', async (req, res) => {
    try {
        const { code } = req.params;
        // Find a quiz by its code in the database
        const quiz = await Quiz.findOne({ where: { code } });
        console.log(quiz.id);
        if (quiz) {
            res.status(200).json({ success: true, data: quiz });
        } else {
            res.status(404).json({ success: false, message: 'Quiz not found' });
        }
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Quiz updation
router.put('/quizzes/:code', QuizAuthorization, async (req, res) => {
    try {
        const user = req.user;
        console.log(user.id);
        const { code } = req.params;
        const {...fields } = req.body;

        // Find the quiz by code and update its fields
        const quiz = await Quiz.findOne({ where: { code } });

        if (quiz) {
            // Update the fields
            for (const key of Object.keys(fields)) {
                quiz[key] = fields[key];
            }

            // Save the quiz
            await quiz.save();
            res.status(200).json({ success: true, data: quiz });
        } else {
            res.status(404).json({ success: false, message: 'Quiz not found' });
        }
    } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Quiz deletion
router.delete('/quizzes', async (req, res) => {
    try {
        // Delete all quizzes
        await Quiz.destroy({ where: {} });
        res.status(200).json({ success: true, message: 'Quizzes deleted successfully' });
    } catch (error) {
        console.error('Error deleting quizzes:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Quiz deletion by id
router.delete('/quizzes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the quiz by ID and delete it
        const quiz = await Quiz.findByPk(id);
        if (quiz) {
            await quiz.destroy();
            res.status(200).json({ success: true, message: 'Quiz deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Quiz not found' });
        }
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
