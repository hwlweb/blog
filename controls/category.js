"use strict";
var parse = require('co-body');
var categoryModules = require('../modules/categories');
var Categories = require('../config/categories');
var ArticleCate = require('../config/article');

module.exports.searchCategory = function *searchCategory() {
    var app = this;
    var article = this.params.article;
    var list = yield categoryModules.list({cate:article}, app);

    yield app.render('./article', {
        posts: list,
        categories: Categories,
        session: app.session,
        user:app.session.user,
        current: 'post',
        articleCate: ArticleCate,
        article: article || 'all'
    });
};