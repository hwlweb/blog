"use strict";

var router = require('koa-router');
var home = require('../controls/home');
var login = require('../controls/login');
var Article = require('../controls/article');
var Ask = require('../controls/ask');
var User = require('../controls/user');
var Category = require('../controls/category');
var Comment = require('../controls/comment');

module.exports = function (app) {
    app.use(router(app));

    app.get('/',Article.list);
    app.get('/index',Article.list);
    app.get('/post',Article.list);
    app.get('/ask',Article.list);

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
    app.post('/regin', User.regIn);
    app.post('/loginIn', User.loginIn);
    app.get('/login_out', User.loginOut);

    //post
    app.get('/article/:article', Category.searchCategory);

    //search
    app.post('/search', Article.search);

    //comment
    app.post('/comment/add', Comment.add);

};



