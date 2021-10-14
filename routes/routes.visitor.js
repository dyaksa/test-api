const VisitorController = require('../controller/visitor.controller');
const upload = require('../middleware/upload.middleware');
const AuthMiddleware = require('../middleware/auth.middleware');

exports.routes = (app) => {
    app.post('/visitor/create', [
        AuthMiddleware.validJWTNeeded,
        upload.uploadImage,
        VisitorController.create
    ]);

    app.get('/visitor/list', [
        AuthMiddleware.validJWTNeeded,
        VisitorController.get
    ]);

    app.get('/visitor/:id/detail', [
        AuthMiddleware.validJWTNeeded,
        VisitorController.detail
    ]);

    app.patch('/visitor/:id/update', [
        AuthMiddleware.validJWTNeeded,
        VisitorController.update
    ]);

    app.delete('/visitor/:id/delete', [
        AuthMiddleware.validJWTNeeded,
        VisitorController.delete
    ])
}