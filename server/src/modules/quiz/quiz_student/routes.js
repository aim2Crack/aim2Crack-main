const Router = require('express-promise-router');
const router = Router({ mergeParams: true });
const controller = require('./controller');
const {facultyCheck, belongsToCheck} = require('./helper');
// const authentication = require('../../../authentication')


module.exports = (authentication) => {
    baseUrl = '/quiz'

    // student answer routes
    router.get(`${baseUrl}/studentanswer/:code`, authentication,
        controller.getfirstquestion
    );

    router.post(`${baseUrl}/studentanswer/:code/:currentIndex`, authentication,
    controller.saveAnsAndGetQues
    );

    router.get(`${baseUrl}/studentresult/:code`, authentication,
    controller.getstudentresult
);

router.get(`${baseUrl}/studentquiz`, authentication,
    controller.getStudentQuiz
);

// router.post(`${baseUrl}/endquiz/:code`, authentication,
// controller.endQuizAndCalScore
// );


    return router;
}