// const { Sequelize, DataTypes } = require('sequelize');
const User = require('./user');
const ResetPass = require('./resetpass');
const Quiz = require('./quiz');
const QuizQuestion=require('./quizquestion')

// Define the relationship between User and Quiz
// Define the relationship between User and Quiz
// User.hasMany(Quiz, { foreignKey: 'user_id' }); // User can have multiple quizzes
// Quiz.belongsTo(User, { foreignKey: 'user_id' }); // Quiz belongs to a user

module.exports = {
    User, ResetPass, Quiz, QuizQuestion,
}