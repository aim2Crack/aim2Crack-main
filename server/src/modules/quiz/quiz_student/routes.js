const express = require('express');
const router = express.Router();
const QuizAuthorization = require('../../../controllers/quizAuthorisation');
const StudentResult = require('../../../models/studentresult');
const StudentAnswer = require('../../../models/studentans');
const StudentAuthorization = require('../../../controllers/studentAuthorisation');
const FacultyAuthorization = require('../../../controllers/facultyAuthorisation');
const {getStudentResultSummary}= require('./controller')


router.get('/studentresultsummary/:code/all', QuizAuthorization, getStudentResultSummary)