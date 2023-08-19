const express = require('express');
const generateLink = require('../service/generateLink');



const createQuiz = async (req, res) => {
    const user = req.user;
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
}


module.exports = { createQuiz }