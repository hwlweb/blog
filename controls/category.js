"use strict";
var parse = require('co-body');
var categoryModules = require('../modules/categories');
var Categories = require('../config/categories');

module.exports.searchCategory = function *searchCategory() {
    var app = this;
    var category = this.params.category;
    var list = yield categoryModules.list({cate:category}, app);
    console.log(list);
    yield app.render('./category/category_article_list', {
        posts: list,
        categories: Categories,
        session: app.session,
        current: category
    });
};