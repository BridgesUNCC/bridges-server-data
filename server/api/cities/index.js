'use strict';

var express = require('express');
var controller = require('./cities.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/count', controller.count);
router.get('/one', controller.findOne);

module.exports = router;
