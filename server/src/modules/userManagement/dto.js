const { User, ResetPass } = require('../../../models/models');
const { Op } = require('sequelize');

const bcrypt = require('bcrypt');

const findUser = async (details) => {
    const { username, email } = details;

    if (username) {
        const user = await User.findOne({
            where: { username: username }
        });
        return user;
    } else if (email) {
        const user = await User.findOne({
            where: { email: email }
        });
        return user;
    } else {
        throw new Error("Either username or email must be provided.");
    }
};

const createUser = async (details) => {
    try {

        const { username, password, email, phone, profileType } = details;
        hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username: username.toLowerCase(),
            password: hashedPassword,
            email: email.toLowerCase(),
            phone,
            profileType
        });
        if (!user) throw new Error('Unable to create user.');
        return user;
    } catch (err) {
        throw new Error(err.errors[0].message);
    }
}


const createResetDetails = async (details) => {
    const { username, email, resetToken, resetTokenExpiration, status} = details;

    try {
    const resetPass = await ResetPass.create({
        username: username,
        email: email ,
        resetToken: resetToken,
        resetTokenExpiration,
        passwordReset: status,
      });
      if (!resetPass) throw new Error('Unable to create reset password table.');
      return resetPass;
  } catch (err) {
      throw new Error(err.errors[0].message);
  }
}


const deleteResetDetails = async (username) => {
  try {
      await ResetPass.destroy({ where: { username: username} });     
    } catch (err) {
      throw new Error(err.errors[0].message);
  }
}

const findResetDetails = async (token) => {
    const resetDetails =await ResetPass.findOne({ where: { resetToken: token } })
    return resetDetails;
}


module.exports = {
    createUser,
    findUser,
    deleteResetDetails,
    createResetDetails,
    findResetDetails
}