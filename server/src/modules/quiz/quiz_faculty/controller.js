const express = require('express');
const {generateUniqueLink} = require('./helper');
const {newQuiz, findallQuiz, findQuiz, deleteQuizByCode} = require('./dto');


const createQuiz = async (req, res) => {
    const user = req.user;
    try {
        const { startTime, 
            marginTime,
            resultTime,
            quizName,
            sectionName,
            negativeMarking,
            preventMobile,
            allowTabchange } = req.body;
        const generatedLink = await generateUniqueLink();
        // Create a new quiz in the database
        const quiz = await newQuiz({
            generatedLink,
            startTime,
            marginTime,
            resultTime,
            quizName,
            sectionName,
            negativeMarking,
            preventMobile,
            allowTabchange,
            userId: user.id
        });
        await quiz.setUser(user);
        res.status(201).json({ success: true, data: quiz });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getallQuiz = async (req, res) => {
    try {
        const reqId = req.user.id;
        console.log(reqId);
        const allquiz= await findallQuiz(reqId);
        res.status(200).json({success:true, data:allquiz})
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getQuizByCode = async(req,res)=>{
try {
    const { code } = req.params;
    const quiz = await findQuiz(code);
    if (quiz) {
        res.status(200).json({ success: true, data: quiz });
    } else {
        res.status(404).json({ success: false, message: 'Quiz not found' });
    }
} catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
}
};

const editQuizByCode = async (req, res) => {
    try {
        const user = req.user;
        console.log(user.id);
        const { code } = req.params;
        const {...fields } = req.body;

        // Find the quiz by code and update its fields
        const quiz = await findQuiz(code);
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
};


const deleteQuiz = async (req, res) => {
       try {
            const { code} = req.params;
            // console.log('quiz id',id);
            const deleteQuiz= await deleteQuizByCode (code)
            res.status(200).json({ success: true, message: 'Quiz deleted successfully' });
        } catch (error) {
            console.error('Error deleting quiz:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    };
    


module.exports = { createQuiz,
getallQuiz,
getQuizByCode,
editQuizByCode,
deleteQuiz }