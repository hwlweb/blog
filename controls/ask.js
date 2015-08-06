"use strict";
var parse = require('co-body');
var categoryModules = require('../modules/categories');
var Categories = require('../config/categories');
var ArticleCate = require('../config/article');

module.exports.Home = function *searchCategory() {
    var app = this;
    var category = this.params.post;
    var article = this.params.article;
    var list = yield categoryModules.list({cate:category}, app);

    yield app.render('./category/category_article_list', {
        posts: list,
        categories: Categories,
        session: app.session,
        current: category,
        article: article
    });
};
