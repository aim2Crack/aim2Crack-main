// const authentication = require('./controllers/authorisation');
const userRoutes = require('./src/modules/userManagement/routes')
const quizFacultyRoutes = require('./src/modules/quiz/quiz_faculty/routes')
const quizStudentRoutes = require('./src/modules/quiz/quiz_student/routes')

const express = require('express');
const apiRouter = express.Router();
const authentication = require('./authentication')

apiRouter.get('/healthCheck', authentication, async (req, res) => {
    return res.json({
        status: " Working well. "
    });
});

apiRouter.use(userRoutes(authentication));
apiRouter.use(quizFacultyRoutes(authentication));
apiRouter.use(quizStudentRoutes(authentication));

module.exports = apiRouter;

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  //user routes
  //quiz routes
//   app.use('/',quizRoutes);
  
//   app.use('/',quizquestionRoutes);
//   testDbConnection();
//   sq.sync({ logging: console.log });
//   //student routes
//   app.use('/',studentAnsRoutes);
//   app.use('/',studentResultRoutes);
  
  