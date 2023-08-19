const express = require('express');
const router = express.Router();
const {createQuiz}= require('./controller')

router.post('/quizzes', FacultyAuthorization, createQuiz);
