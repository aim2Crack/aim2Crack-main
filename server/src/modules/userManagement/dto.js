const { User, ResetPass } = require('../../../models/models');
const { Op } = require('sequelize');

const bcrypt = require('bcrypt');

// user details realted operations

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

const findUser = async (details) => {
    const { username, email } = details;
    if (username|| email)
    {
    const user = await User.findOne({
        where: {
          [Op.or]: [
             { username: username },
             { email: email }
          ]
        }
      });        return user;
    } else {
        throw new Error("User not found");
    }
};


const updateUser = async (details) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        rollNo,
        institute,
        profileType,
        brandName,
        brandLink,
        brandLogo,
        brandFavicon,
      } = details;
  
      let updatedUser;
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        updatedUser = await User.update(
          {
            password: hashedPassword,
          },
          {
            where: {
              email: email,
            },
            returning: true,
          }
        );
      } else {
        updatedUser = await User.update(
          {
            firstName,
            lastName,
            rollNo,
            institute,
            profileType,
            brandName,
            brandLink,
            brandLogo,
            brandFavicon,
          },
          {
            where: {
              email: email,
            },
            returning: true,
          }
        );
      }
  
      if (!updatedUser[1]?.[0]) {
        throw new Error('Error in updating details');
      }
  
      return updatedUser[1][0];
    } catch (err) {
      throw new Error(err.message || 'An error occurred while updating details');
    }
  };
  

// Mail and verification related operations
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
    updateUser,
    deleteResetDetails,
    createResetDetails,
    findResetDetails
}