const express = require('express');
const router = express.Router();
const Quiz = require('../../../models/quiz');
const FacultyAuthorization = require('../../../controllers/facultyAuthorisation');
const authorization=require('../../../controllers/authorisation');
const generateLink = require('../../../controllers/generateLink')
const User =require('../../../models/user');
const QuizAuthorization = require('../../../controllers/quizAuthorisation');

// Create a quiz
router.post('/quizzes',FacultyAuthorization, async (req, res) => {
    const user=req.user;
    console.log(user.id);
    try {
        const { startTime, marginTime, resultTime, quizName, sectionName, negativeMarking, preventMobile, allowTabchange} = req.body;
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
            collaborators:[]
        });
        await quiz.setUser(user);
        res.status(201).json({ success: true, data: quiz });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Get all quizzes
router.get('/quizzes',FacultyAuthorization, async (req, res) => {
    try {
        const reqId=req.user.id
        console.log(reqId);
        const user = await User.findByPk(reqId);
        // console.log(user);
        if (user) {
        allquiz = await Quiz.findAll({
        where: { userId:reqId },
         });
        
        }
        // Sort the allquiz array in descending order based on creation time
      allquiz.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Fetch all quizzes from the database
        // const quizzes = await Quiz.findAll();
        res.status(200).json({ success: true, data: allquiz });
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

//access quiz by id
router.get('/quizzes/:code', async (req, res) => {
    try {
        const {code} = req.params;
  // Find a quiz by its code in the database
  const quiz = await Quiz.findOne({ where: { code } });
  console.log(quiz.id)
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

// quiz updation
router.put('/quizzes/:code',QuizAuthorization, async (req, res) => {
    try {
        // const { id } = req.params;
        const user=req.user;
        console.log(user.id);
        const {code}=req.params;
        // const {startTime, marginTime, resultTime, quizName, sectionName, negativeMarking, preventMobile, allowTabchange,instructions} = req.body;

        // Find the quiz by ID and update its properties
        // const quiz = await Quiz.findByPk(id);
        console.log(code);
        const {...fields } = req.body;

        // Find the quiz by ID and update its fields
        // const quiz = await Quiz.findByPk(code);/
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

//quiz deletion
router.delete('/quizzes', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the quiz by ID and delete it
        const quiz = await Quiz.destroy({where: {}});
        // if (quiz) {
        //     await quiz.destroy();
        //     res.status(200).json({ success: true, message: 'Quiz deleted successfully' });
        // } else {
        //     res.status(404).json({ success: false, message: 'Quiz not found' });
        // }
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


//quiz deletion
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
