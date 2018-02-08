'use strict';

var express = require('express');
var controller = require('./dataset.controller');

var router = express.Router();

router.get('/raw', controller.raw);
router.get('/', controller.index);
// router.get('/snippet/:lang', controller.snippet);

router.getDatasets = controller.getDatasets;

module.exports = router;
