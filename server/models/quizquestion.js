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
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    explanation: {
      type: DataTypes.TEXT,
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
      type: DataTypes.ENUM('multiple','numerical','single'),
      defaultValue: 'single',
    },
    questionLevel:{
      type: DataTypes.ENUM('hard','medium','easy'),
      defaultValue: 'easy',
    },
    negativeMark:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    options: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
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
