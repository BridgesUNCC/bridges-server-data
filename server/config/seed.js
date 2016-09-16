/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Test = require('../api/test/test.model');

// // Insert seed data below
var testSeed = require('../api/test/test.seed.json');

// Insert seed inserts below
Test.find({}).remove(function() {
  Test.create(testSeed);
});
