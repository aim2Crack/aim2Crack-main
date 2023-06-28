const express = require('express')
const {sq,testDbConnection} = require('./db')
// const {User, ResetPass} = require("./models/models");
const userRoutes = require('./routes/UserRoutes');
const resetRoutes= require('./routes/user/password_reset');

const loginRoutes= require('./routes/user/login');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express()
const PORT = 7000

// CORS middleware
// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:3000', 'https://aim2crack.onrender.com', 'http://localhost:3000'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  next();
});


require('./auth/auth');

const secureRoute = require('./routes/user/profile');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/',userRoutes);
app.use('/',resetRoutes);
app.use('/',loginRoutes);

testDbConnection();
sq.sync()

// models.sq.sync({ force: true }).then(result => {
//   console.log('model synced!')
// })

app.listen(PORT, () => { 
  console.log(`Example app listening on PORT ${PORT}`)
})