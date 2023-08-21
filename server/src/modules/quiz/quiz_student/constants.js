const { validateUserData, getUserDetails } = require('./helper');
const { createUser, findUser } = require('./dto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await findUser({ username });
        if (!(user && await bcrypt.compare(password, user.password))) {
            throw new Error('Either username or password is wrong.');
        }
        const userDetails = await getUserDetails(user);
        const token = jwt.sign(userDetails, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.json({ user, token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const signup = async (req, res) => {
    try {
        const userDetails = await validateUserData(req.body);
        const user = await createUser(userDetails);
        return res.json({ newUser: user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    signin,
    signup
}