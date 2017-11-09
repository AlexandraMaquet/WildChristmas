"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var enfant_1 = require("./controllers/enfant");
var user_1 = require("./controllers/user");
function setRoutes(app) {
    var router = express.Router();
    var enfantCtrl = new enfant_1.default();
    var userCtrl = new user_1.default();
    // Children
    router.route('/enfants').get(enfantCtrl.getAll);
    router.route('/enfants/count').get(enfantCtrl.count);
    router.route('/enfant').post(enfantCtrl.insert);
    router.route('/enfant/:id').get(enfantCtrl.get);
    router.route('/enfant/:id').put(enfantCtrl.update);
    router.route('/enfant/:id').delete(enfantCtrl.delete);
    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map