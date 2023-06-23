const {sq} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'Kashish-16', {
  host: 'localhost',
  dialect: 'mysql',
});


const User = sq.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  
    fullName: {
      type: DataTypes.STRING,
    },
    
    age: {
      type: DataTypes.INTEGER,
    },
  });

  User.sync().then(() => {
    console.log("User Model synced");
  });


//   return User
  module.exports = User;