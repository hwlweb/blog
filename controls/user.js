"use strict";
var parse = require('co-body');
var userModules = require('../modules/user');
var crypto = require('crypto');

module.exports.reg = function *reg() {
    yield this.render('/user/reg');
};

module.exports.login = function *reg() {
    yield this.render('/user/login');
};

module.exports.regIn = function *regIn(){
    var app = this;
    var post = yield parse(this);
    var md5 = crypto.createHash('md5');
    post.password = md5.update(post.password).digest('base64');
    post.created_at = new Date;
    yield userModules.insert(post, app);

    //JS TODO: 1、是否己有相同的用户名 2、密码与确认密码验证 3、表单验证 4、验码码验证

    app.redirect('/login');
}

module.exports.loginIn = function *regIn(){
    var app = this;
    var post = yield parse(this);
    var searchUser = post.email;
    //req password
    var md5 = crypto.createHash('md5');
    var password = md5.update(post.password).digest('base64');
    //用户不存在
    var user = yield userModules.search({email:searchUser}, app);
    if(user == null){
        return yield this.render('/user/login',{
            noUserlist: true
        });
    }else{
        //密码不对
        if (user.password != password) {
            return yield this.render('/user/login',{
                noUserlist: true
            });
        }else{
            //登录成功
            this.session.user = user.email;
            this.session.nikoname = user.nickname;
            app.redirect('/');
        }
    }
}

module.exports.loginOut = function *regIn(){
    this.session.user = null;
    this.redirect('/');
}