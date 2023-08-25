const { validateUserData, getUserDetails, mailDetails} = require('./helper');
const { createUser, findUser, deleteResetDetails, createResetDetails} = require('./dto');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


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
        const mailer = await sendVerificationEmail (user.username, user.email, false)
        return res.json({ newUser: user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Function to send the verification email
const sendVerificationEmail = async (username, email,status) => {
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = new Date(Date.now() + 60000); // Token expires in 1o minutes
    const user = await findUser({ username, email });
     // when the user request multiple times, old link will get deleted even if the token is not expired
    await deleteResetDetails(user.username);
    const resetPass = await createResetDetails({
        username: username,
        email: user.email, 
        resetToken: resetToken,
        resetTokenExpiration: resetTokenExpiration,
        status: false
    });
    
    await mailDetails(user.email,resetToken);
  };
  



module.exports = {
    signin,
    signup,
    sendVerificationEmail
}