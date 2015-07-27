"use strict";

module.exports.reg = function *reg() {
    yield this.render('/user/reg');
};

module.exports.login = function *reg() {
    yield this.render('/user/login');
};