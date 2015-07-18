"use strict";

var router = require('koa-router');
var home = require('../controls/home');

module.exports = function (app) {
    app.use(router(app));

    app.get('/',home);
}



