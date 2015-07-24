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
    post.modify_at = '';

    yield articleModules.insert(post, app);
    app.redirect('/');
};

module.exports.edit = function *edit() {
    var app = this;
    var id = new ObjectId(this.params.id);
    var post = yield articleModules.findOne({_id:id}, app);
    yield app.render('article/edit', { post: post });
};

module.exports.update = function *update() {
    var app = this;
    var id = new ObjectId(this.params.id);
    var post = yield parse(this);
    var modifyTime = new Date;

    yield articleModules.updateById({_id:id},{$set:{title:post.title,body:post.body,modify_at:modifyTime}}, app);
    app.redirect('/post/' + id);
};

module.exports.detail = function *detail(id) {
    var app = this;
    var id = new ObjectId(this.params.id);
    var post = yield articleModules.show({_id:id}, app);
    yield app.render('article/detail', { post: post });
};

module.exports.list = function *list() {
    var app = this;
    var postList = yield articleModules.list(app);
    yield app.render('home', { posts: postList });
};

module.exports.remove = function *remove(id) {
    var app = this;
    var id = new ObjectId(this.params.id);
    yield articleModules.remove({_id:id},app);
    app.redirect('/');
};

