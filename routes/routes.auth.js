const AuthController = require('../controller/auth.controller');

exports.routes = (app) => {
    app.post('/admin/login',[
        AuthController.login
    ]);

    app.post('/admin/register', [
        AuthController.register
    ])
}