'use strict';

var express = require('express');
var controller = require('./download.controller');
var Auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', Auth.isAuthenticated(), controller.download);

module.exports = router;