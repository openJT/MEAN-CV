'use strict';
var path = require('path');
var config = require('./config/environment');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/cv/', 'index.html'));
    });
    app.use('/auth', require('./auth'));
    app.use('/api/users', require('./api/user'));
    app.use('/download', require('./api/download'));
    app.use('/jobs', require('./api/jobs'));
    app.use('/info', require('./api/info'));

};