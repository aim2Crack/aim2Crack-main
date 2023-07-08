const {sq} = require('../db');
const {DataTypes} = require('sequelize');

const Quiz = sq.define("quiz", {
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
        // allowNull: true,
        defaultValue: [],
    },
        creator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    collaborators: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        // allowNull: true,
        defaultValue: [],
    },
},
{
    tableName: 'quizzes'
});

Quiz.sync().then(() => {
    console.log("Quiz Model synced");
  });
  
module.exports = Quiz;
