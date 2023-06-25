const {sq} = require('../db');
const {DataTypes} = require('sequelize');


const ResetPass = sq.define("resetpass", {
  username: {
    type: DataTypes.STRING,
    // allowNull: true,
    // unique: true,
},
email: {
    type: DataTypes.STRING,
    // allowNull: true,
    // unique: true,
    validate: {
        isEmail: true,
    },
},
resetToken:{
    type: DataTypes.STRING,
    allowNull: true,
},
resetTokenExpiration:{
  type: DataTypes.DATE,
  allowNull: true,
},
});

  ResetPass.sync().then(() => {
    console.log("Reset Model synced");
  });


//   return User
  module.exports = ResetPass;