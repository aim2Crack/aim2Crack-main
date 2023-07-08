const express = require('express')
const {sq,testDbConnection} = require('./db')
const {User, ResetPass, Quiz} = require("./models/models");
const signupRoutes = require('./routes/user/SignUp');
const firebaseConfig = require('./serviceAccountCredentials.json')
const resetRoutes= require('./routes/user/passwordReset');
const admin = require('firebase-admin')
const mailerRoutes=require('./routes/user/VerifyMailer')
const loginRoutes= require('./routes/user/login');
const quizRoutes=require('./routes/quizzes/quiz_faculty/quiz');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const PORT = 7000



admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});
// CORS middleware
// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:3000', 'https://aim2crack.onrender.com', 'http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  next();
});

// Enable CORS middleware
app.use(cors());

// Allow 'Authorization' header
app.options('*', cors({
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

require('./auth/auth');

const secureRoute = require('./routes/user/profile');
const {config} = require("dotenv");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//user routes
app.use('/',signupRoutes);
app.use('/',resetRoutes);
app.use('/',loginRoutes);
app.use('/',mailerRoutes);

//quiz routes
app.use('/',quizRoutes);
testDbConnection();
sq.sync({ logging: console.log });


// models.sq.sync({ force: true }).then(result => {
//   console.log('model synced!')
// })

app.listen(PORT, () => { 
  console.log(`Example app listening on PORT ${PORT}`)
})