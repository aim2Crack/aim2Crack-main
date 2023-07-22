const { sq } = require('../db');
const { DataTypes,Sequelize } = require('sequelize');

const bcrypt = require('bcrypt');
const QuizQuestion = require('./quizquestion');
const Quiz = require('./quiz');
const User =require('./user');

const QuizOrderArray = sq.define('quizorderarray', {
  quizId: {
    type: DataTypes.INTEGER,
    references: {
      model: Quiz,
      key: 'id',
    },
  },
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  questionOrder: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  index: {
    type: DataTypes.INTEGER,
    defaultValue:1,
  },
});

QuizOrderArray.associate = (models) => {
  QuizOrderArray.belongsTo(models.Quiz, { foreignKey: 'quizId' }); // student belongs to a quiz
  QuizOrderArray.belongsTo(models.User, { foreignKey: 'studentId' }); // student answer belongs to a quiz question
};

QuizOrderArray.sync().then(() => {
  console.log('Quiz oder array Model synced');
});


module.exports = QuizOrderArray;
