const { sq } = require('../db');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const StudentResult = sq.define('studentresult', {
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalCorrect:
  {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalWrong:
  {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalUnattempt:
  {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = StudentResult;
