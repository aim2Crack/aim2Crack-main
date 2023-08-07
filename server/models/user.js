const { sq } = require('../db');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');



const User = sq.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileType: {
    type: DataTypes.ENUM('student', 'faculty'),
    defaultValue: 'student',
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rollNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  institute: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'none',
  },
  brandLogo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brandLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brandFavicon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailVerify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});


// //password-matching
// Instance method to compare password
User.prototype.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

User.sync().then(() => {
  console.log("User Model synced");
});


//   return User
module.exports = User;