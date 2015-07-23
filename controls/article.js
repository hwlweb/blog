"use strict";
var parse = require('co-body');
var articleModules = require('../modules/article');
var ObjectId = require('mongodb').ObjectID;

module.exports.addArticle = function *addArticle() {
    yield this.render('/article/add');
};

module.exports.create = function *create() {
    var app = this;
    var post = yield parse(this);
    post.created_at = new Date;

    yield articleModules.insert(post, app);
    app.redirect('/');
};

module.exports.edit = function *edit() {
    var app = this;
    var id = new ObjectId(this.params.id);
    var post = yield articleModules.findOne({_id:id}, app);
    yield app.render('article/edit', { post: post });
};