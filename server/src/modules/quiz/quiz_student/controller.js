const express = require('express');
const router = express.Router();
const QuizOrderArray = require('../../../../models/quizorderarray');



const { getAllQuestions, findQuiz, findallQuiz } = require('../quiz_faculty/dto');
const { calculateTotalTime, shuffleArray, getNextQuestion, calculateScore, generateResult,  } = require('./helper');
const { findOrderArrayById, findOrderArrayByUser, createOrderArray, findQuestion,saveAnswer, updateEndQuiz, findQuizByUser } = require('./dto');


// router.get('/studentanswer/:code', StudentAuthorization, 
const getfirstquestion = async (req, res) => {
    try {
      const user = req.user;
      const { code } = req.params;
      const quiz = await findQuiz(code);
      const now = Date.now(); 
      if (quiz.marginTime < now) {
        return res.status(404).json({ success: false, message: 'Time up' });
      }
     const quizQuestions= await getAllQuestions(quiz);
      if (!quizQuestions || quizQuestions.length === 0) {
        return res.status(404).json({ success: false, message: 'Quiz questions not found' });
      }
      const totalQuestions = quizQuestions.length;
      const totalQuizTime = calculateTotalTime(quizQuestions);
      await shuffleArray(quizQuestions);
      const randomQuestionIds = quizQuestions.map((question) => question.id);
      let quizOrder;
      quizOrder = await findOrderArrayByUser(user,quiz);
      let currentIndex;
      if (quizOrder) {
      console.log('quiz order present')
      indexOne = quizOrder.index;
      console.log('indexOne value:',indexOne)
       if (indexOne !== 0 || quizOrder.firstQues == true) {
        currentIndex = indexOne + 1;
        quizOrder.index = currentIndex;
        await quizOrder.save();
      }  else{
   currentIndex = 0;
  }
  }else {
    currentIndex = 0;
  }
  if(!quizOrder)
  {  
    console.log('quiz order not present');
    console.log('current Index', currentIndex);
    quizOrder = await createOrderArray({quiz,user,randomQuestionIds,index:0});
    }  
  const firstQuestion = await getNextQuestion(quizOrder.id, currentIndex);
  // await quizOrder.update({ index: currentIndex});
  if (!firstQuestion || !quizOrder.status) {
    return res.status(404).json({ success: false, message: 'No questions found' });
  }
  res.status(201).json({ success: true, data: {firstQuestion, currentIndex, totalQuizTime, totalQuestions} });
    } catch (error) {
      console.error('Error creating student answer:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  
const saveAnsAndGetQues = async (req,res) =>{
    try {
        const user = req.user;
        const {code } = req.params;
        const quiz = await findQuiz(code);
        const { answer, timeElapsed } = req.body;
        const quizOrder = await findOrderArrayByUser(user, quiz);
        if (quizOrder) {
        currentIndex = quizOrder.index;
       await QuizOrderArray.update(
        { index: parseInt(currentIndex, 10)+1 },
        { where: { id: quizOrder.id } }
      );
          console.log('Updated status array:', quizOrder.status);
        } else {
          console.error('Error updating quizOrder status');
        }    
        if (!quizOrder) {
          return res.status(404).json({ success: false, message: 'Quiz order not found' });
        }
        const quizQuestion= await findQuestion(quizOrder.questionOrder[currentIndex]);
        if (!quizQuestion) {
          // If the quiz question with the given ID doesn't exist, return an error response
          return res.status(404).json({ success: false, message: 'Quiz question not found in currentindex' });
        }

        //calculate score
        // const score= await calculateScore(quizQuestion,answer); 
        // console.log(score);
        const studentAnswer = await saveAnswer({quizOrder, user, answer, timeElapsed,score:0});
        quizOrder.index = currentIndex + 1;
        await quizOrder.save();
        const nextIndex = parseInt(currentIndex, 10) + 1;
        console.log('Updated index:', nextIndex);  
        const nextQuestion = await getNextQuestion(quizOrder.id, nextIndex);
        if (!nextQuestion || !quizOrder.status) {
          await updateEndQuiz(quizOrder);
          await calculateScore(quiz,user);
          await generateResult(quiz,user);
          return res.status(410).json({ success: true, message: 'No more questions left' });
        }
        console.log('Array  length', quizOrder.questionOrder.length);
        if (nextIndex < quizOrder.questionOrder.length){
          res.status(200).json({ success: true, data: {nextQuestion,nextIndex} });
        }
        else
        {
          res.status(200).json({ success: true, message: 'End of array' });
        }
      } catch (error) {
        console.error('Error saving answer and getting next question:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    };

const getstudentresult = async(req,res) =>{
  try{
    const {code}=req.params;
    const quiz = await findQuiz(code);
    const user=req.user;
    const finalResult= await generateResult(quiz,user);
    if (finalResult) {
      res.status(200).json({ success: true, message:'total marks calculated', data: finalResult});
    } else {
      res.status(404).json({ success: false, message: 'Student result not found' });
    }
  } catch (error) {
    console.error('Error fetching student result:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getStudentQuiz = async (req, res) => {
  try {
    const user = req.user;
    const finalQuiz = await findQuizByUser(user);

    if (finalQuiz) {
      const quizIds = finalQuiz.map((quiz) => quiz.quizId);
      const quizDetailsMap = {};
      await Promise.all(
        quizIds.map(async (quizId) => {
          const quizDetails = await findallQuiz(quizId); // Use your getQuizById function
          quizDetailsMap[quizId] = quizDetails;
        })
      );

      res.status(200).json({
        success: true,
        message: 'Student quiz details retrieved',
        data: quizDetailsMap,
      });
    } else {
      res.status(404).json({ success: false, message: 'Student quiz details not found' });
    }
  } catch (error) {
    console.error('Error fetching student quiz details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



module.exports = { 
    getfirstquestion,
    saveAnsAndGetQues,
  getstudentresult,
getStudentQuiz}