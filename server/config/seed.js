/**
 * Populate DB with data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

console.log('Seeding DB');

var seeds = {
  'tests': true,
  'games': false,
  'books': false,
  'shakespeare': false
};

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
if(seeds.tests) {
  console.log('Seeding tests');
  Test.find({}).remove(function() {
    Test.create(testSeed);
  });
}

if(seeds.games) {
  console.log('Seeding games');
  // Insert all games (17534 records)
  Game.find({}).remove(function() {
    Game.create(gameSeed);
  });
}

if(seeds.books) {
  console.log('Seeding books');
  // Insert all books (1000 records)
  Book.find({}).remove(function() {
      Book.create(bookSeed);
  });
}

if(seeds.shakespeare) {
  console.log('Seeding shakespeare');
  // Insert all Shakespeare works (190 records)
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
}
