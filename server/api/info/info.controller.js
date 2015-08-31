'use strict';
var config = require('../../config/environment');
var Info = require('./info.model');

exports.download = function(req, res) {
    Info.find(function (err, info) {
        if(err) { return handleError(res, err);}
        res.status(200).json(info);
    });

};
function handleError(res, err) {
    return res.send(500, err);
}