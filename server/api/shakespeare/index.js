'use strict';

var express = require('express');
var controller = require('./shakespeare.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/sonnets', controller.sonnets);
router.get('/plays', controller.plays);
router.get('/:title', controller.index);

module.exports = router;
