"use strict";

var mongo = require('koa-mongo');
var thunkify = require('thunkify');

module.exports.insert = function *(obj, app) {
    var collection = app.mongo.db('niko_wolf_blog').collection('user');
    var insert = thunkify(collection.insert.bind(collection));

    yield insert(obj);
}

module.exports.search = function *(obj, app) {
    var collection = app.mongo.db('niko_wolf_blog').collection('user');
    var findOne = thunkify(collection.findOne.bind(collection));

    return yield findOne(obj);
}