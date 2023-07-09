const { sq } = require('../db');
const { DataTypes,Sequelize } = require('sequelize');
const Quiz = require('./quiz');

const QuizQuestion = sq.define(
  'quizquestion',
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    explanation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    questionTime: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      defaultValue: 60,
    },
    mark: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      defaultValue:1,
    },
    sectionId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    questionType:{
      type: DataTypes.ENUM('single','mulitple','numerical'),
      defaultValue: 'single',
    },
    negativeMark:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    quizId: {
      type: DataTypes.INTEGER,
      references: {
        model: Quiz,
        key: 'id',
      },
    },
  },
);

QuizQuestion.associate = (models) => {
  QuizQuestion.belongsTo(models.Quiz, { foreignKey: 'quizId' }); // Quiz question belongs to a quiz
};

QuizQuestion.sync().then(() => {
  console.log('QuizQuestion Model synced');
});

module.exports = QuizQuestion;
