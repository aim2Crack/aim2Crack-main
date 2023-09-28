const express = require('express')
const {sq,testDbConnection} = require('./db')
const {User, ResetPass, Quiz} = require("./models/models");
// const fileUploadRouter=require('./routes/mediaupload/fileupload');


const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const PORT = 7000

const apiRoutes = require('./routes');

// admin.initializeApp({
//   credential: admin.credential.cert(firebaseConfig),
// });
// CORS middleware
// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:3000', 'https://aim2crackfinal.onrender.com', 'http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'];
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

// require('./auth/auth');

// const secureRoute = require('./routes/user/profile');
const {config} = require("dotenv");


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());

// Plug in the JWT strategy as a middleware so only verified users can access this route.
// app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//user routes
// app.use('/',signupRoutes);
// app.use('/',resetRoutes);
// app.use('/',loginRoutes);
// app.use('/',mailerRoutes);
// app.use('/', fileUploadRouter); 
//quiz routes
// app.use('/',quizRoutes);
// app.use('/',quizquestionRoutes);
testDbConnection();
sq.sync({ logging: console.log });
//student routes
// app.use('/',studentAnsRoutes);
// app.use('/',studentResultRoutes);

// models.sq.sync({ force: true }).then(result => {
//   console.log('model synced!')
// })

// Refractored routes

app.use('/api', apiRoutes);



app.listen(PORT, () => { 
  console.log(`Example app listening on PORT ${PORT}`)
})