const AuthController = require('../controller/auth.controller');
const Validator = require('../middleware/validator.middleware');
const AuthMiddleware = require('../middleware/auth.middleware');

exports.routes = (app) => {
    app.post('/auth/login',[
        Validator.login(),
        Validator.validate,
        AuthController.login
    ]);

    app.post('/auth/register', [
        AuthMiddleware.validJWTNeeded,
        AuthController.register
    ]);

    app.post('/auth/refresh-token',[
        AuthController.refreshToken
    ])
}