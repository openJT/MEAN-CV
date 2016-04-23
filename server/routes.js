'use strict';
var path = require('path');
var config = require('./config/environment');

module.exports = function (app) {
    app.use('/mean-cv/auth', require('./auth'));
    app.use('/mean-cv/api/users', require('./api/user'));
    app.use('/mean-cv/download', require('./api/download'));
    app.use('/mean-cv/jobs', require('./api/jobs'));
    app.use('/mean-cv/info', require('./api/info'));
    app.get('/*', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/mean-cv/', 'index.html'));
    });

};