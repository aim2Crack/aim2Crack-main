const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const Quiz = db.define('Quiz', {
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    marginTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    resultTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    quiz_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    section_name: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
    },
    created_on: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updated_on: {
        type: DataTypes.DATE,
        allowNull: false
    },
    collaborators: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
    }
}, {
    tableName: 'quizzes'
});

module.exports = Quiz;
