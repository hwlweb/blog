"use strict";

var router = require('koa-router');
var home = require('../controls/home');
var login = require('../controls/login');
var Article = require('../controls/article');
var User = require('../controls/user');

module.exports = function (app) {
    app.use(router(app));

    app.get('/',Article.list);

    //article
    app.get('/add_article',Article.addArticle);
    app.post('/post', Article.create);
    app.get('/post/:id/edit', Article.edit);
    app.post('/post/:id', Article.update);
    app.get('/post/:id', Article.detail);
    app.get('/post/:id/delete', Article.remove);

    //user
    app.get('/reg', User.reg);
    app.get('/login', User.login);
};



