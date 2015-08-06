"use strict";
var parse = require('co-body');
var articleModules = require('../modules/article');
var ObjectId = require('mongodb').ObjectID;
var Categories = require('../config/categories');
var ArticleCate = require('../config/article');

module.exports.addArticle = function *addArticle() {
    var app = this;
    yield this.render('/article/add',{
        categories: Categories,
        session:app.session,
        current: 'post',
        articleCate: ArticleCate
    });
};

module.exports.create = function *create() {
    var app = this;
    var post = yield parse(this);
    post.created_at = new Date;
    post.modify_at = '';

    yield articleModules.insert(post, app);

    app.redirect('/post');
};

module.exports.edit = function *edit() {
    var app = this;
    var id = new ObjectId(this.params.id);
    var post = yield articleModules.findOne({_id:id}, app);
    yield app.render('article/edit', {
        post: post,
        categories: Categories,
        session:app.session,
        current: 'post',
        articleCate: ArticleCate
    });
};

module.exports.update = function *update() {
    var app = this;
    var id = new ObjectId(this.params.id);
    var post = yield parse(this);
    var modifyTime = new Date;

    yield articleModules.updateById({_id:id},{$set:{title:post.title,body:post.body,created_at:modifyTime,cate:post.cate}}, app);
    app.redirect('/post/' + id);
};

module.exports.detail = function *detail(id) {
    var app = this;
    var id = new ObjectId(this.params.id);
    var post = yield articleModules.show({_id:id}, app);
    yield app.render('article/detail', {
        post: post,
        categories: Categories,
        session:app.session,
        user:app.session.user
    });
};

module.exports.list = function *list() {
    var app = this;
    var postList = yield articleModules.list(app);
    var path = this.url;

    if(path == '/index' || path == '/'){
        yield app.render('home', {
            posts: postList,
            categories: Categories,
            session:app.session,
            user:app.session.user,
            current: 'index'
        });
    }else if(path == '/post'){
        var article = this.params.article;
        yield app.render('article', {
            posts: postList,
            categories: Categories,
            session:app.session,
            user:app.session.user,
            current: 'post',
            articleCate: ArticleCate,
            article: article || 'all'
        });
    }else if(path == '/ask'){
        yield app.render('ask', {
            posts: postList,
            categories: Categories,
            session:app.session,
            user:app.session.user,
            current: 'ask'
        });
    }

};

module.exports.article = function *list() {
    var app = this;
    var postList = yield articleModules.list(app);
    var article = this.params.category;
    yield app.render('article', {
        posts: postList,
        categories: Categories,
        session:app.session,
        user:app.session.user,
        articleCate: ArticleCate,
        article: article
    });
};

module.exports.remove = function *remove(id) {
    var app = this;
    var id = new ObjectId(this.params.id);
    yield articleModules.remove({_id:id},app);
    app.redirect('/post');
};

