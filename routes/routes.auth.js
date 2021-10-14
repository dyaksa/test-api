const AuthController = require('../controller/auth.controller');

exports.routes = (app) => {
    app.post('/auth/login',[
        AuthController.login
    ]);

    app.post('/auth/register', [
        AuthController.register
    ])
}