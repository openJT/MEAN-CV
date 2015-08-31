'use strict';
var config = require('../../config/environment');
var Job = require('./job.model');

exports.download = function(req, res) {
    Job.find(function (err, jobs) {
        if(err) { return handleError(res, err);}
        res.status(200).json(jobs);
    });

};
function handleError(res, err) {
    return res.send(500, err);
}