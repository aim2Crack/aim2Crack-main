const express = require('express')
const {sq,testDbConnection} = require('./db')
const models = require("./models/models");
const userRoutes = require('./routes/UserRoutes');

const app = express()
const PORT = 7000

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/',userRoutes);


testDbConnection();
sq.sync()

// models.sq.sync({ force: true }).then(result => {
//   console.log('model synced!')
// })

app.listen(PORT, () => { 
  console.log(`Example app listening on PORT ${PORT}`)
})