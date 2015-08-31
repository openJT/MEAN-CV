'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jobSchema = new Schema({
    order: Number,
    company: String,
    fromto:  String,
    position: String,
    logo: String,
    skills: [String]

});

module.exports = mongoose.model('Job', jobSchema);