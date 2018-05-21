'use strict';

var express = require('express');
var controller = require('./lyrics.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/one', controller.findOne);

module.exports = router;
