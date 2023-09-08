// const express = require('express');
// const router = express.Router();
// const StudentAuthorization = require('../../../controllers/studentAuthorisation');
// const StudentAnswer = require('../../../models/studentans');
// const User = require('../../../models/user');
// const QuizQuestion = require('../../../models/quizquestion');
// const QuizOrderArray = require('../../../models/quizorderarray');
// const {getNextQuestion} = require('./getNextQuestion');

// // Custom function to compare two arrays and check if they are equal
// const areArraysEqual = (array1, array2) => {
//   if (array1.length !== array2.length) return false;

//   // Create a frequency map for elements in array1
//   const frequencyMap = {};

//   // Count occurrences of elements in array1
//   for (const element of array1) {
//     frequencyMap[element] = (frequencyMap[element] || 0) + 1;
//   }

//   // Decrement the count for elements in array2
//   for (const element of array2) {
//     if (!frequencyMap[element]) {
//       // If an element in array2 doesn't exist in array1, arrays are not equal
//       return false;
//     }
//     frequencyMap[element]--;
//   }

//   // Check if all element counts are zero, meaning arrays are equal
//   for (const element in frequencyMap) {
//     if (frequencyMap[element] !== 0) {
//       return false;
//     }
//   }

//   return true;
// };

// // Function to calculate the total time for the quiz
// const calculateTotalTime = (questions) => {
//   let totalTime = 0;
//   // console.log(totalTime);

//   for (const question of questions) {
//     // Assuming the time property in each quizQuestion represents the time for that question (in seconds)
//     const questionTime = question.questionTime;
//     totalTime += questionTime;
//     // console.log(totalTime);
//   }

//   // Convert totalTime to desired format if needed (e.g., minutes, hours)
//   // For example, if totalTime is in seconds, you can convert it to minutes by dividing by 60.
//   // totalTime /= 60;

//   return totalTime;
// };


// // Get all student answers for a quiz
// router.get('/studentanswer/:code', StudentAuthorization, async (req, res) => {
//   try {
//     const user = req.user;
//     const quiz = req.quiz;
    
//     const { code } = req.params;
//     // console.log(code);

//     const now = Date.now(); // Get the current timestamp in milliseconds

//     // Check if the quiz time is up
//     if (quiz.marginTime < now) {
//       // If the quiz time is up, return an error response
//       return res.status(404).json({ success: false, message: 'Time up' });
//     }


//     const quizQuestions= await QuizQuestion.findAll(
//       {
//         where :{ quizId: quiz.id},
//       }
//     );
// // console.log(quizQuestions);
//     if (!quizQuestions || quizQuestions.length === 0) {
//       // If no quiz questions were found for the given quiz ID, return an error response
//       return res.status(404).json({ success: false, message: 'Quiz questions not found' });
//     }
    
//     const totalQuestions = quizQuestions.length;
// // Calculate the total time for the quiz
//     const totalQuizTime = calculateTotalTime(quizQuestions);
//     // console.log('total quiz time',totalQuizTime);
    
// // Helper function to shuffle an array in place using Fisher-Yates algorithm
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// // Shuffle the quizQuestions array randomly
// shuffleArray(quizQuestions);

// // Extract question IDs into a new array
// const randomQuestionIds = quizQuestions.map((question) => question.id);

// //check for order array
// const quizOrder = await QuizOrderArray.findOne(
//   {
//     where: {studentId:user.id, quizId:quiz.id}
//   }  
// )

// let currentIndex;
// if (quizOrder) {
//     // Get the last index from the quizOrder.status array
//     console.log('quiz order present')
//     indexOne = quizOrder.index;
//     console.log('indexOne value:',indexOne)
//      if (indexOne !== 0) {
//       // / If the value 1 is found, set currentIndex to indexOne + 1
//       currentIndex = indexOne + 1;

//       // Update the currentIndex in the database
//       quizOrder.index = currentIndex;
//       await quizOrder.save();
//     }  else{
//   currentIndex = 0;
// }
// }else {
//   currentIndex = 0;
// }

// // console.log(randomQuestionIds);

// if(!quizOrder)
// {
//   let quizOrder;
    
//   console.log('quiz order not present')
//   quizOrder = await QuizOrderArray.create({
//       quizId: quiz.id,
//       studentId: user.id,
//       questionOrder: randomQuestionIds,
//       index:0
//     });
//   }

//   // console.log(quizOrder.status);
// // Fetch the first question based on the currentIndex (which will be 0 initially)

// const firstQuestion = await getNextQuestion(quizOrder.id, currentIndex);
// // await quizOrder.update({ index: currentIndex});
// if (!firstQuestion || !quizOrder.status) {
//   // If no question is found, return an error response
//   return res.status(404).json({ success: false, message: 'No questions found' });
// }
// // console.log(firstQuestion);
// // Send the first question details to the front end
// res.status(201).json({ success: true, data: {firstQuestion, currentIndex, totalQuizTime, totalQuestions} });
// // send question and get answer.
//     // res.status(201).json({ success: true, data: quizOrder });
//   } catch (error) {
//     console.error('Error creating student answer:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });


// router.post('/studentanswer/:code/:currentIndex', StudentAuthorization, async (req, res) => {
//   try {
//     const user = req.user;
//     const quiz=req.quiz;
//     const {code } = req.params;
//     const { answer, timeElapsed } = req.body;
//     // console.log(answer);
//     // // Save the student's answer here, assuming you have a separate model for student answers
//     // and you can save the answer along with the question ID, student ID, selectedOption, and timeTaken.
//     const quizOrder = await QuizOrderArray.findOne({
//       where:{studentId:user.id, quizId:quiz.id}
//     });
//     console.log(quizOrder.id);
//     if (quizOrder) {
//       // Append the value of 1 to the status array
//       // quizOrder.status[currentIndex] = '1';
//     currentIndex = quizOrder.index;

//    // Use the update method to directly update the status field in the database
//    await QuizOrderArray.update(
//     { index: parseInt(currentIndex, 10)+1 },
//     { where: { id: quizOrder.id } }
//   );
//       // await quizOrder.save();

//       console.log('Updated status array:', quizOrder.status);
//     } else {
//       // Handle the case when quizOrder is not found or status is not an array
//       console.error('Error updating quizOrder status');
//     }

//     if (!quizOrder) {
//       // If the quiz order with the given ID doesn't exist, return an error response
//       return res.status(404).json({ success: false, message: 'Quiz order not found' });
//     }
//     // console.log(quizOrder);
//     const quizQuestion= await QuizQuestion.findByPk(quizOrder.questionOrder[currentIndex]);
//     // console.log(quizQuestion.id);

//     if (!quizQuestion) {
//       // If the quiz question with the given ID doesn't exist, return an error response
//       return res.status(404).json({ success: false, message: 'Quiz question not found in currentindex' });
//     }

//     // console.log(quizQuestion.answer);
//     // console.log(answer);
//     let score =0;
// // For single-choice questions, directly compare the selected answer with the correct answer
// if (quizQuestion.questionType == 'single' || quizQuestion.questionType == 'numerical' ) {
//   if (quizQuestion.answer == answer[0]) {
//     score = quizQuestion.mark;
//   }
// }

// // For multiple-choice questions, use the custom array comparison function to check if the answers match
// if (quizQuestion.questionType == 'multiple') {
//   if (areArraysEqual(quizQuestion.answer, answer)) {
//     score = quizQuestion.mark;
//   }
// }    console.log(score);
//     const studentAnswer = StudentAnswer.create({
//       questionId: quizOrder.dataValues.questionOrder[currentIndex],
//       studentId: user.id,
//       answer: answer,
//       timeElapsed: timeElapsed,
//       score,
//       quizId: quizOrder.quizId,
//     });
// // console.log(studentAnswer);
//     // Increment the currentIndex for the next question
//      // Update the currentIndex in the database
//      quizOrder.index = currentIndex + 1;
//      await quizOrder.save();

//     const nextIndex = parseInt(currentIndex, 10) + 1;

//     console.log('Updated index:', nextIndex);

//     // Get the next question based on the new index
   
//     const nextQuestion = await getNextQuestion(quizOrder.id, nextIndex);
   
//     if (!nextQuestion || !quizOrder.status) {
//       return res.status(410).json({ success: true, message: 'No more questions left' });
//     }
//     console.log('Array  length', quizOrder.questionOrder.length);
//     // console.log(nextQuestion)
//     // Send the next question details to the front end
//     if (nextIndex < quizOrder.questionOrder.length)
//       res.status(200).json({ success: true, data: {nextQuestion,nextIndex} });
//     else
//       res.status(200).json({ success: true, message: 'End of array' });

//   } catch (error) {
//     console.error('Error saving answer and getting next question:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });

// // quizorderarray status updation to make it end the quiz upon blur event

// router.post('/endquiz/:code', StudentAuthorization, async (req, res) => {
//   try {
//     const user = req.user;
//     const quiz=req.quiz;
//     const {code } = req.params;
//     const { status } = req.body;
//     // console.log(answer);
//     // // Save the student's answer here, assuming you have a separate model for student answers
//     // and you can save the answer along with the question ID, student ID, selectedOption, and timeTaken.
//     const quizOrder = await QuizOrderArray.findOne({
//       where:{studentId:user.id, quizId:quiz.id}
//     });
//     console.log(quizOrder.id);
//     if (quizOrder) {
//       // Append the value of 1 to the status array
//       // quizOrder.status[currentIndex] = '1';
//     // currentStatus = quizOrder.index;

//    // Use the update method to directly update the status field in the database
//    await QuizOrderArray.update(
//     { status: status },
//     { where: { id: quizOrder.id } }
//   );
//       // await quizOrder.save();

//       console.log('Updated status array:', quizOrder.status);
//     } else {
//       // Handle the case when quizOrder is not found or status is not an array
//       console.error('Error updating quizOrder status');
//     }

//     if (!quizOrder) {
//       // If the quiz order with the given ID doesn't exist, return an error response
//       return res.status(404).json({ success: false, message: 'Quiz order not found' });
//     }
//   } catch (error) {
//     console.error('Error posting data:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });

// module.exports = router;
