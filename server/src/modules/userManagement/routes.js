const Router = require('express-promise-router');
const router = Router({ mergeParams: true });
const controller = require('./controller');


module.exports = (authentication) => {
    baseUrl = '/users'

    router.post(`${baseUrl}/signin`,
        controller.signin
    );

    router.post(`${baseUrl}/signup`,
        controller.signup
    );


    return router;
}