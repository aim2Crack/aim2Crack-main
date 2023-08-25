const { User, ResetPass } = require('../../../models/models');
const { Op } = require('sequelize');

const bcrypt = require('bcrypt');

const findUser = async (details) => {
    const { username, email } = details;
    const user = await User.findOne({
        where: {
          [Op.or]: [
            { username: username },
            { email: email }
        ]
        }
    })
    return user;
}

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
    console.log(username);
    console.log(details);
 
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




module.exports = {
    createUser,
    findUser,
    deleteResetDetails,
    createResetDetails
}