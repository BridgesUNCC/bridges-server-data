/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Test = require('../api/test/test.model');
var Game = require('../api/game/game.model').model;

// // Insert seed data below
var testSeed = require('../api/test/test.seed.json');
var gameSeed = require('../api/game/game.seed.json');

// Insert seed inserts below
Test.find({}).remove(function() {
  Test.create(testSeed);
});

// Insert all games (17534 records)
Game.find({}).remove(function() {
  Game.create(gameSeed);
});
