const Router = require('express-promise-router');
const router = Router({ mergeParams: true });
const controller = require('./controller');
const {facultyRoute} = require('./helper');
// const authentication = require('../../../authentication')


module.exports = (authentication) => {
    baseUrl = '/quiz'

    router.post(`${baseUrl}/quizzes`, authentication, facultyRoute,
        controller.createQuiz
    );

  router.get(`${baseUrl}/quizzes`, authentication, facultyRoute,
         controller.getallQuiz
     );

//     router.get(`${baseUrl}/quizzes/:code`,
//         controller.getQuizByCode
// );

//     router.put(`${baseUrl}/quizzes/:code`,
//         controller.editQuizByCode
// );

//     router.delete(`${baseUrl}/delete/:code`,
//         controller.deleteQuizByCode
//     );

    return router;
}