"use strict";

var cluster = require('cluster');
var path = require('path');
var cpuCount = require('os').cpus().length;
var fs = require('fs');

var workerPath = path.join(__dirname, 'app.js');

cluster.setupMaster({
    exec: workerPath
});

if(cluster.isMaster) {
    cluster.on('disconnect', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is disconnect.');
        cluster.fork();
    });

    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online.');
    });
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died.');
    });

    for (var i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
}

fs.writeFileSync(path.join(__dirname, 'pid'), process.pid);
