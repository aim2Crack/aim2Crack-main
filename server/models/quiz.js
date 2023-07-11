const { sq } = require('../db');
const { DataTypes } = require('sequelize');
const User = require('./user');
// const QuizQuestion = require('./quizquestion');

const Quiz = sq.define(
  'quiz',
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    marginTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    resultTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    quizName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sectionName: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    negativeMarking: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    preventMobile: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    allowTabchange: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collaborators: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
  }
);

Quiz.belongsTo(User, { foreignKey: 'userId' }); // Quiz belongs to a user

Quiz.associate = (models) => {
  Quiz.hasMany(models.QuizQuestion, { foreignKey: 'quizId' }); // Quiz has many quiz questions
  
};

Quiz.sync().then(() => {
  console.log('Quiz Model synced');
});

module.exports = Quiz;
