"use strict";

var mongo = require('koa-mongo');
var mongoConfig = require('../config/mongo_server');

module.exports = function *(app) {
    app.use(mongo(mongoConfig.mongoServerConfig));

    this.mongo.db('niko_wolf_blog').collection('article').insert(obj, function (err, doc) {
        if(err){
            console.log(err);
        }
    });
}