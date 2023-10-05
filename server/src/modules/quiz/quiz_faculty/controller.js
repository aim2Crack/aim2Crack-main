const express = require('express');
const {generateUniqueLink, correctAnswer, addQuestion, editQuestion, consolidateStudentData} = require('./helper');
const {newQuiz, findallQuiz, findQuiz, deleteQuizByCode, getAllQuestions, findQuestionById, getAllAnswers, getAllResults} = require('./dto');
const StudentAnswer = require('../../../../models/studentans');
const { findUser, findUserById } = require('../../userManagement/dto');


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
    

const addQuizQuestion = async(req,res) => {
    const quiz=req.quiz;
    // console.log(quiz);
    try {
        const { question,
            options,
            explanation,
            questionTime,
            marks,
            sectionId,
            correctAnsInteger,
            questionLevel, questionType, negativeMark} = req.body;
         const ans= await correctAnswer(options, correctAnsInteger, questionType);
         const quizQuestion = await addQuestion({question, ans, explanation, questionTime, marks, options, questionLevel,
            sectionId, questionType, negativeMark, quiz})
        // await quiz.addQuizQuestion(quizQuestion);
        console.log(quizQuestion);
        res.status(201).json({ success: true, data: quizQuestion });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
const editQuizQuestion = async(req,res) => {
    const quiz=req.quiz;
    const {id}=req.params;
    try {
        const { question,
            options,
            explanation,
            questionTime,
            marks,
            sectionId,
            correctAnsInteger,
            questionLevel, questionType, negativeMark} = req.body;
         const ans= await correctAnswer(options, correctAnsInteger, questionType);
         const quizQuestion = await editQuestion({question, ans, explanation, questionTime, marks, options, questionLevel,
            sectionId, questionType, negativeMark, quiz,id})
        if (quizQuestion && quiz.startTime > Date.now()){
            const studentans = await getAllAnswers(quiz);
            if (studentans){
                console.log(studentans);
            }
        }
        console.log(quizQuestion);
        res.status(201).json({ success: true, data: quizQuestion });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



// get all the questions in a particular quiz 
const getAllQuestion = async (req, res) => {
try { 
        const user=req.user.id;
        const quiz=req.quiz;
        const allques = await getAllQuestions(quiz); 
        allques.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json({ success: true, data: allques });
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


const getAQuestion = async (req, res) => {
    try {
        const {code} = req.params;
        const {id}=req.params;
        const quiz = await findQuiz(code);
        const quizquestion = await findQuestionById(id);
        if (quizquestion) {
            res.status(200).json({ success: true, data: quizquestion });
        } else {
            res.status(404).json({ success: false, message: 'Quiz Question not found' });
        }
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}; 

//delete a question in a quiz
const deleteQuizQuestion= async (req, res) => {
    try {
        const {code} = req.params;
        const {id}=req.params;
        const quiz = await findQuiz(code);
        const quizquestion = await findQuestionById(id);
        if (quizquestion) {
            await quizquestion.destroy();
            res.status(200).json({ success: true, message: 'question deleted'});
        } else {
            res.status(404).json({ success: false, message: 'Quiz Question not found' });
        }
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const deleteQuizResponse= async (req, res) => {
    try {
        const {code} = req.params;
        const {id}=req.params;
        const quiz = await findQuiz(code);
        const quizresponse = await getAllAnswers(quiz);
        if (quizquestion) {
            await quizresponse.destroy();
            res.status(200).json({ success: true, message: 'question response deleted'});
        } else {
            res.status(404).json({ success: false, message: 'Quiz response not found' });
        }
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


const studentResultSummary= async (req, res) => {
    try {
        const {code} = req.params;
        const quiz = await findQuiz(code);
        const {user} = req.user;
        const summaryResults = await getAllResults(quiz);
        const allAnswers= await getAllAnswers(quiz);   
        const studentIds = summaryResults.map((quizResult) => quizResult.studentId);
        const studentDetailsObj = {};
        for (const studentId of studentIds) {
            const studentData = await findUserById(studentId);
            studentDetailsObj[studentId] = studentData;
        }
        const questionDetails = await getAllQuestions(quiz);
        const consolidatedData = await consolidateStudentData(allAnswers);
        res.status(200).json({ success: true, data: {allAnswers,summaryResults, studentDetailsObj, questionDetails, consolidatedData, quiz} });
    
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


module.exports = { createQuiz,
getallQuiz,
getQuizByCode,
editQuizByCode,
deleteQuiz,
deleteQuizResponse,
addQuizQuestion,
editQuizQuestion,
getAllQuestion,
getAQuestion,
deleteQuizQuestion,
studentResultSummary }