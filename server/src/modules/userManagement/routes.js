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

    router.put(`${baseUrl}/signup`,
        controller.updateuserdetails
);

    router.get(`${baseUrl}/verifymail`,
        controller.verifymail
    );

    router.post(`${baseUrl}/forgot-password`,
    controller.forgotpassword
);

    return router;
}