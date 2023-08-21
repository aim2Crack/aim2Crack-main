const { validateUserData, getUserDetails, mailDetails, transporter } = require('./helper');
const { createUser, findUser, deleteResetDetails, createResetDetails} = require('./dto');

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
        const mailer = await sendVerificationEmail (user.username, user.email, false)
        return res.json({ newUser: user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Function to send the verification email
const sendVerificationEmail = async (username, recipientEmail,status) => {
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = new Date(Date.now() + 60000); // Token expires in 1o minutes
    const user = await findUser({ username, recipientEmail });
     // Find and delete the existing resetPass record for the username
    await deleteResetDetails(username);
     // Create a new resetPass record
    const resetPass = await createResetDetails(username, user.email,resetToken,resetTokenExpiration, status);
    console.log(resetPass);
    //Mail verification link to the user
    await mailDetails(user.email);
  };
  



module.exports = {
    signin,
    signup,
    sendVerificationEmail
}