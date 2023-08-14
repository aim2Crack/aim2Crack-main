const User = require('../../../models/user');

const getUserDetails = async (email) =>{
const user = await User.findOne({
    where: { email: email }
  });
}

module.exports = {getUserDetails}