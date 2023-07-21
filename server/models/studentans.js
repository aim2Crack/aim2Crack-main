const { sq } = require('../db');
const { DataTypes,Sequelize } = require('sequelize');

const bcrypt = require('bcrypt');


const StudentAnswer = sq.define('student_answer', {
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  submissionTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = StudentAnswer;
