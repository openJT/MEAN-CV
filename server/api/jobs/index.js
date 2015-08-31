'use strict';

var express = require('express');
var controller = require('./job.controller');
var Auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', Auth.isAuthenticated(), controller.download);

module.exports = router;