const Router = require('express-promise-router');
const router = Router({ mergeParams: true });
const controller = require('./controller');
const {facultyCheck, belongsToCheck} = require('./helper');
// const authentication = require('../../../authentication')


module.exports = (authentication) => {
    baseUrl = '/quiz'

    // quiz routes
    router.post(`${baseUrl}/quizzes`, authentication, facultyCheck,
        controller.createQuiz
    );
    router.get(`${baseUrl}/quizzes`, authentication, facultyCheck,
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

    // question routes
    router.post(`${baseUrl}/quizquestion/:code`, authentication, facultyCheck, belongsToCheck,
        controller.addQuizQuestion
    );
    router.get(`${baseUrl}/quizquestion/:code`, authentication, facultyCheck, belongsToCheck,
        controller.getAllQuestion
    );
    router.get(`${baseUrl}/quizquestion/:code/:id`, authentication, facultyCheck, belongsToCheck,
        controller.getAQuestion
    );
    router.delete(`${baseUrl}/quizquestion/:code/:id`, authentication, facultyCheck, belongsToCheck,
        controller.deleteQuizQuestion
    );

    return router;
}