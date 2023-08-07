const { User } = require('../../../models/models');
const bcrypt = require('bcrypt');

const findUser = async (details) => {
    const { username } = details;
    const user = await User.findOne({
        where: {
            username: username || ""
        }
    })
    return user;
}

const createUser = async (details) => {
    try {

        let { username, password, email, phone, profileType } = details;
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

module.exports = {
    createUser,
    findUser
}