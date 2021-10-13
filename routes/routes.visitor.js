const VisitorController = require('../controller/visitor.controller');
const upload = require('../middleware/upload.middleware');

exports.routes = (app) => {
    app.post('/visitor/create', [
        upload.uploadImage,
        VisitorController.create
    ]);

    app.get('/visitor/list', [
        VisitorController.get
    ]);

    app.get('/visitor/:id/detail', [
        VisitorController.detail
    ]);

    app.patch('/visitor/:id/update', [
        VisitorController.update
    ]);

    app.delete('/visitor/:id/delete', [
        VisitorController.delete
    ])
}