"use strict";
var mongo = require('koa-mongo');
var thunkify = require('thunkify');
var marked = require('marked');

var formart = function(postList,isList){
    if(postList.length > 0){
        for(var i = 0; i < postList.length;i++){
            var time = new Date( postList[i].created_at );
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var day = time.getDate();
            var hour = time.getHours();
            var minute = time.getMinutes();
            var second = time.getSeconds();
            var date = year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second;
            postList[i].created_at = date;

            var body = postList[i].body;
            if(body){
                if(isList){
                    postList[i].body = marked(body).substring(0,300);
                }else{
                    postList[i].body = marked(body);
                }
            }
        }
    }else{
        var time = new Date( postList.created_at );
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var day = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        var date = year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second;
        postList.created_at = date;

        var body = postList.body;
        if(body){
            postList.body = marked(body);
        }
    }

};

module.exports.list = function *(obj,app) {
    var collection = app.mongo.db('niko_wolf_blog').collection('article');
    var postList = collection.find(obj).sort({created_at:-1});
    var list = thunkify(postList.toArray.bind(postList));
    var postList = yield list();
    formart(postList,true);
    return postList;
}