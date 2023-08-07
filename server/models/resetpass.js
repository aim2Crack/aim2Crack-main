const { sq } = require('../db');
const { DataTypes } = require('sequelize');


const ResetPass = sq.define("resetpass", {
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetTokenExpiration: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  passwordReset: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

ResetPass.sync().then(() => {
  console.log("Reset Model synced");
});

module.exports = ResetPass;