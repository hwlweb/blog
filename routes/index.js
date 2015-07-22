"use strict";

var router = require('koa-router');
var home = require('../controls/home');
var login = require('../controls/login');

module.exports = function (app) {
    app.use(router(app));

    app.get('/',home);

    app.get('/login', login);
}



