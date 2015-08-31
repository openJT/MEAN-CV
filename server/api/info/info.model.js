'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var infoSchema = new Schema({
    name: String,
    address1:  String,
    address2: String,
    address3: String,
    email: String,
    github:  String,
    phone: String,
    cell: String,
    about: String

});

module.exports = mongoose.model('Info', infoSchema);