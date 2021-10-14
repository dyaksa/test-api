const visitor = require('./routes.visitor');
const auth = require('./routes.auth');

exports.routesConfig = (app) => {
    visitor.routes(app);
    auth.routes(app)
}