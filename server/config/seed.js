/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

console.log('Seeding DB');

// Insert seed models below
var Test = require('../api/test/test.model');
var Game = require('../api/game/game.model').model;
var Book = require('../api/book/book.model').model;
var Shakespeare = require('../api/shakespeare/shakespeare.model').model;

// // Insert seed data below
var testSeed = require('../api/test/test.seed.json');
var gameSeed = require('../api/game/game.seed.json');
var bookSeed = require('../api/book/classicsParser.js');


// Insert seed inserts below
Test.find({}).remove(function() {
  Test.create(testSeed);
});

// Insert all games (17534 records)
Game.find({}).remove(function() {
  Game.create(gameSeed);
});

// Insert all books (1000 records)
Book.find({}).remove(function() {
    Book.create(bookSeed);
});

// Insert all Shakespeare works
require('../api/shakespeare/shakespeareParser.js')(function(err, data){
  if(err) {
    console.log(err);
    return;
  }
  // Insert all shakespeare
  Shakespeare.find({}).remove(function() {
      Shakespeare.create(data);
  });
});
