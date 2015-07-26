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

module.exports.updateById = function *(idObj,postObj, app) {
    var collection = app.mongo.db('niko_wolf_blog').collection('article');
    var update = thunkify(collection.update.bind(collection));

    yield update(idObj,postObj);
}

module.exports.show = function *(obj, app) {
    var collection = app.mongo.db('niko_wolf_blog').collection('article');
    var show = thunkify(collection.findOne.bind(collection));

    return yield show(obj);
}

module.exports.list = function *(app) {
    var collection = app.mongo.db('niko_wolf_blog').collection('article');
    var postList = collection.find().sort({created_at:-1});
    //这里需要把查询的结果，toArray一下，再把toArray方法thunkify一下才能正常运行
    var list = thunkify(postList.toArray.bind(postList));

    return yield list();
}

module.exports.remove = function *(obj, app) {
    var collection = app.mongo.db('niko_wolf_blog').collection('article');
    var remove = thunkify(collection.remove.bind(collection));

    return yield remove(obj);
}