"use strict";
var mongo = require('koa-mongo');
var thunkify = require('thunkify');

module.exports.insert = function *(obj, app) {
    var collection = app.mongo.db('niko_wolf_blog').collection('article');
    // 把collection的this指针包成一个临时的thunkify对象
    var insert = thunkify(collection.insert.bind(collection));

    yield insert(obj);
}

module.exports.findOne = function *(obj, app) {
    var collection = app.mongo.db('niko_wolf_blog').collection('article');
    var findOne = thunkify(collection.findOne.bind(collection));

    return yield findOne(obj);
}