const express = require('express');
const {generateUniqueLink} = require('./helper');
const {newQuiz, findallQuiz} = require('./dto');


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



module.exports = { createQuiz,
getallQuiz }