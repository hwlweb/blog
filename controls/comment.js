"use strict";
var parse = require('co-body');
var articleModules = require('../modules/article');
var ObjectId = require('mongodb').ObjectID;
var Categories = require('../config/categories');
var ArticleCate = require('../config/article');

module.exports.add = function *add() {
    var app = this;
    var post = yield parse(this);
    post.created_at = new Date;
    post.modify_at = '';

    //yield articleModules.insert(post, app);

    //app.redirect('/post');
};