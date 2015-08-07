"use strict";
var mongo = require('koa-mongo');
var thunkify = require('thunkify');
var marked = require('marked');

var formart = function(postList,isList){
    if(postList.length > 0){
        for(var i = 0; i < postList.length;i++){
            var time = new Date( postList[i].created_at );
            var now = new Date().getTime();
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var day = time.getDate();
            var hour = time.getHours();
            var minute = time.getMinutes();
            var second = time.getSeconds();
            var date = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
            var oneDay = 24 * 60 * 60 * 1000;
            var long = now - time.getTime();

            if(long > oneDay){
                postList[i].created_at = date;
            }else{
                var second = parseInt(long / 1000,10);
                var minutie = parseInt(long / 1000 / 60,10);
                var hour = parseInt(long / 1000 / 60 / 60,10);
                if(second < 60){
                    postList[i].created_at = second + '秒前';
                }
                else if(minutie < 60){
                    postList[i].created_at = minutie + '分钟前';
                }
                else if(hour < 60){
                    long = parseInt(long / 1000 / 60 / 60,10);
                    postList[i].created_at = hour + '小时前';
                }
            }


            var body = postList[i].body;
            if(body){
                if(isList){
                    postList[i].body = marked(body).substring(0,200);
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
    var article = {};
    var collection = app.mongo.db('niko_wolf_blog').collection('article');

    var searchId = obj._id;
    var next = collection.find({_id:{$gt:searchId}}).sort({created_at:1}).limit(1);
    var prev = collection.find({_id:{$lt:searchId}}).sort({created_at:1}).limit(1);
    //当前篇
    var show = thunkify(collection.findOne.bind(collection));
    var showObj = yield show(obj);
    //下一篇
    var nextThunkify = thunkify(next.toArray.bind(next));
    var nextObj = yield nextThunkify();

    //下一篇
    var prevThunkify = thunkify(prev.toArray.bind(prev));
    var prevObj = yield prevThunkify();

    formart(showObj);
    article.current = showObj;
    article.prev = prevObj;
    article.next = nextObj;

    return article;
}

module.exports.list = function *(app) {
    var collection = app.mongo.db('niko_wolf_blog').collection('article');
    var postList = collection.find().sort({created_at:-1});
    //这里需要把查询的结果，toArray一下，再把toArray方法thunkify一下才能正常运行

    var list = thunkify(postList.toArray.bind(postList));
    var postList = yield list();
    formart(postList,true);
    return postList;
}

module.exports.remove = function *(obj, app) {
    var collection = app.mongo.db('niko_wolf_blog').collection('article');
    var remove = thunkify(collection.remove.bind(collection));

    return yield remove(obj);
}