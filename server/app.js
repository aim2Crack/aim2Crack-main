const express = require('express')
const {sq,testDbConnection} = require('./db')
const models = require("./models/models");
const userRoutes = require('./routes/UserRoutes');

const app = express()
const PORT = 7000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(userRoutes);

testDbConnection();
sq.sync()

// models.sq.sync({ force: true }).then(result => {
//   console.log('model synced!')
// })

app.listen(PORT, () => { 
  console.log(`Example app listening on PORT ${PORT}`)
})