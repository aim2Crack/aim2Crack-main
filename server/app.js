const express = require('express');
const apiRoutes = require('./routes');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const PORT = 7000

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

app.use(cors());

app.options('*', cors({
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

require('./auth/auth');

const secureRoute = require('./routes/user/profile');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})