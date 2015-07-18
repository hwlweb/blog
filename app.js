"use strict";

var koa = require('koa');              //koa 框架
var Path = require('path');
var View = require('koa-views');       //模板解析
var Static = require('koa-static');    //静态服务资源
var Router = require('./routes');

var app = koa();

/* error handler */
app.use(function *errorHandler (next) {
    try {
        yield next;
    } catch(e) {
        // TODO 记录日志
        console.error(e.stack);
        if(config.env === 'dev') {
            console.error('出错啦!!!!!!!!!!');
            this.body = e.stack;
        }else{
            this.body = 'server error';
        }
    }
});

/* static server */
app.use(Static(Path.resolve(__dirname, './views')));

/* template engine */
var dust = require('dustjs-helpers');
dust.config.whitespace = true; // 不压缩html代码
app.use(View('./views', {
    default: 'dust'
}));

/* route */
Router(app);

app.listen(3000, function() {
    console.log('server started on:', 3000);
});
