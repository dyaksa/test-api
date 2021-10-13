const visitor = require('./routes.visitor');

exports.routesConfig = (app) => {
    visitor.routes(app);
}