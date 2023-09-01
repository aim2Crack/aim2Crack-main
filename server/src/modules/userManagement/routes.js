const Router = require('express-promise-router');
const router = Router({ mergeParams: true });
const controller = require('./controller');
// const authentication = require('../../../authentication')


module.exports = (authentication) => {
    baseUrl = '/users'

    router.post(`${baseUrl}/signin`,
        controller.signin
    );

    router.post(`${baseUrl}/signup`,
        controller.signup
    );

    router.get(`${baseUrl}/signup`, authentication,
        controller.getuser
);

    router.put(`${baseUrl}/signup`, authentication,
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