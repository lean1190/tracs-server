/* globals require, describe, beforeEach, afterEach, it, console */

var request = require('supertest'),
    http = require('http'),
    mongoose = require("mongoose");

describe('loading express', function () {
    var server;

    beforeEach(function () {
        delete require.cache[require.resolve('../app')];
        var app = require('../app'),
            port = 5000;

        server = http.createServer(app);
        server.listen(port);
        console.log('### Testing server listening on port: ' + port);
    });

    afterEach(function (done) {
        server.close(done);
        mongoose.connection.close();
    });

    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
        console.log('test 404');
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});
