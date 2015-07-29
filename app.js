"use strict";

var koa = require('koa');              //koa 框架
var Path = require('path');
var View = require('koa-views');       //模板解析
var Static = require('koa-static');    //静态服务资源
var Router = require('./routes');
var session = require('koa-session');

var app = koa();

/* error handler */
var logger = require('koa-logger');
app.use(logger());

/* static server */
app.use(Static(Path.resolve(__dirname, './static')));

/*session*/
app.keys = ['hwl wolf'];
app.use(session(app));

/* template engine */
var dust = require('dustjs-helpers');
dust.config.whitespace = true; // 不压缩html代码
app.use(View('./views', {
    default: 'dust'
}));

/* Modules */
var mongo = require('koa-mongo');
var mongoConfig = require('./config/mongo_server');
app.use(mongo(mongoConfig.mongoServerConfig));

/* route */
Router(app);

app.listen(3000, function() {
    console.log('server started on:', 3000);
});
