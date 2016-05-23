'use strict';

var express = require('express');
var controller = require('./core.controller.js');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/contact-form', controller.sendMail);

module.exports = router;
