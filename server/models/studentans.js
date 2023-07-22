const { sq } = require('../db');
const { DataTypes,Sequelize } = require('sequelize');

const bcrypt = require('bcrypt');
const QuizQuestion = require('./quizquestion');
const Quiz = require('./quiz');

const StudentAnswer = sq.define('studentans', {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
   answer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timeElapsed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  quizId: {
    type: DataTypes.INTEGER,
    references: {
      model: Quiz,
      key: 'id',
    },
  },
  questionId: {
    type: DataTypes.INTEGER,
    references: {
      model: QuizQuestion,
      key: 'id',
    },
  },

});

StudentAnswer.associate = (models) => {
  StudentAnswer.belongsTo(models.Quiz, { foreignKey: 'quizId' }); // student belongs to a quiz
  StudentAnswer.belongsTo(models.QuizQuestion, { foreignKey: 'questionId' }); // student answer belongs to a quiz question
};

StudentAnswer.sync().then(() => {
  console.log('Student Answer Model synced');
});


module.exports = StudentAnswer;
