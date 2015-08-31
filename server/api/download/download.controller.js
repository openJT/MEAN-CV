'use strict';
var config = require('../../config/environment');
var Path = require('path');

exports.download = function(req, res) {
    res.sendFile(Path.join(config.root, 'private/JD.pdf'));
};
