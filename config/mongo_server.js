"use strtic";

module.exports = function *(){
    var mongoServerConfig = {
        host: 'localhost',
        port: 27017,
        user: 'root',
        pass: 'hwl512921',
        db: 'niko_wolf_blog',
        max: 1000,
        min: 1,
        timeout: 30000,
        log: false
    }
}