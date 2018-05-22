'use strict';

var express = require('express');
var controller = require('./song.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/one', controller.findOne);
router.get('/find/:songname', controller.find);

module.exports = router;
