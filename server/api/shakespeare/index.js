'use strict';

var express = require('express');
var controller = require('./shakespeare.controller');

var router = express.Router();

router.get('/poems', controller.poems);
router.get('/plays', controller.plays);
router.get('/titles', controller.titles);
router.get('/one', controller.findOne);
router.get('/:title', controller.index);
router.get('/', controller.index);


module.exports = router;
