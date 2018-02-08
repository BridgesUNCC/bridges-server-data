'use strict';

var express = require('express');
var controller = require('./game.controller');

var router = express.Router();

router.get('/', controller.raw);
router.get('/home', controller.index);
// router.get('/snippet/:lang', controller.snippet);

module.exports = router;
