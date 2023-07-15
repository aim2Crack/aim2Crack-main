const { sq } = require('../db');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const StudentResult = sq.define('student_result', {
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
});

module.exports = StudentResult;
