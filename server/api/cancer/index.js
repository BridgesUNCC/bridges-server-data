'use strict';

var express = require('express');
var controller = require('./cancer.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/one', controller.findOne);
router.get('/withlocations', controller.withLoc);
router.get('/count', controller.count);
router.get('/stats', controller.stats);

module.exports = router;
