const Router = require('express-promise-router');
const router = Router({ mergeParams: true });
const controller = require('./controller');
const {facultyCheck, belongsToCheck} = require('./helper');
// const authentication = require('../../../authentication')


module.exports = (authentication) => {
    baseUrl = '/quiz'

    router.post(`${baseUrl}/quizzes`, authentication, facultyCheck,
        controller.createQuiz
    );

  router.get(`${baseUrl}/quizzes`, authentication, facultyCheck, belongsToCheck,
         controller.getallQuiz
     );

 router.get(`${baseUrl}/quizzes/:code`, authentication, facultyCheck, belongsToCheck,
         controller.getQuizByCode
     );

    router.put(`${baseUrl}/quizzes/:code`, authentication, facultyCheck, belongsToCheck,
        controller.editQuizByCode
    );

      router.delete(`${baseUrl}/quizzes/:code`, authentication, facultyCheck, belongsToCheck,
           controller.deleteQuiz
   );

    return router;
}