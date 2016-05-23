'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));

/*
var auth = require('./auth.service');
function hasEspecificRoleLocal(req, res) {
  res.send(auth.hasEspecificRole(req.body.userRole,req.body.roleRequired));
}
router.post('/hasEspecificRole', hasEspecificRoleLocal);
 */

var auth = require('./auth.service');

function userRoles(req, res) {
  res.send(config.userRoles);
}
router.get('/userRoles', auth.isAuthenticated(), userRoles);

module.exports = router;

