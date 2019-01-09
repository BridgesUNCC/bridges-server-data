/**
 * Populate DB with data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

console.log('Seeding DB');

var seeds = {
  'datasets': true,
  'tests': true,
  'games': false,
  'books': false,
  'song': false,
  'shakespeare': false,
  'imdb': false,
  'imdb2': false,
  'cancer': false,
  'crime': false,
  'cities': false
};

// Insert seed models below
var Dataset = require('../api/dataset/dataset.model').model;
var Test = require('../api/test/test.model');
var Game = require('../api/game/game.model').model;
var Song = require('../api/song/song.model').model;
var Book = require('../api/book/book.model').model;
var Shakespeare = require('../api/shakespeare/shakespeare.model').model;
var IMDB = require('../api/imdb/imdb.model').model;
var IMDB2 = require('../api/imdb2/imdb2.model').model;
var Cancer = require('../api/cancer/cancer.model').model;
var Crime = require('../api/crime/crime.model').model;
var Cities = require('../api/cities/cities.model').model;

// // Insert seed data below
var DatasetSeed = require('../api/dataset/dataset.seed.json');
var testSeed = require('../api/test/test.seed.json');
var gameSeed = require('../api/game/game.seed.json');
var songSeed = require('../api/song/song.seed.json');
var bookSeed = require('../api/book/classicsParser.js');
var IMDBSeed = require('../api/imdb/imdbParser.js');
var IMDB2Seed = require('../api/imdb2/imdb2.json');
var CancerSeed = require('../api/cancer/cancer.json');
var CrimeSeed = require('../api/crime/crimeParser.js');
var CitiesSeed = require('../api/cities/US_cities.json');

// Insert seed inserts below
if(seeds.datasets) {
  console.log('Seeding datasets');
  Dataset.find({}).deleteMany(function() {
    Dataset.create(DatasetSeed);
  });
}

if(seeds.tests) {
  console.log('Seeding tests');
  Test.find({}).deleteMany(function() {
    Test.create(testSeed);
  });
}

if(seeds.games) {
  console.log('Seeding games');
  // Insert all games (17534 records)
  Game.find({}).deleteMany(function() {
    Game.create(gameSeed);
  });
}

if(seeds.song) {
  console.log('Seeding songs');
  // Insert all songs (?? records)
  Song.find({}).deleteMany(function() {
    Song.create(songSeed);
  });
}

if(seeds.books) {
  console.log('Seeding books');
  // Insert all books (1000 records)
  Book.find({}).deleteMany(function() {
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
    Shakespeare.find({}).deleteMany(function() {
        Shakespeare.create(data);
    });
  });
}

if(seeds.imdb) {
  console.log('Seeding imdb');
  require('../api/imdb/imdbParser.js')(function(err, data){
    if(err) {
      console.log(err);
      return;
    }
    IMDB.find({}).deleteMany(function() {
        IMDB.create(data);
    });
  });
}

if(seeds.imdb2) {
  console.log('Seeding imdb2');
  // Insert all actor movie objects (484 records)
  IMDB2.find({}).deleteMany(function() {
      IMDB2.create(IMDB2Seed);
  });
}

if(seeds.cancer) {
  console.log('Seeding cancer', CancerSeed.length);
  Cancer.find({}).deleteMany(function(err) {
    if(err) {
      console.log(err);
      return;
    }
    Cancer.create(CancerSeed);
  });
}

if(seeds.crime) {
  console.log('Seeding crime');
  // Insert all Crime data
  require('../api/crime/crimeParser.js')(function(err, data){
    if(err) {
      console.log(err);
      return;
    }
    // Insert all crime data
    Crime.find({}).deleteMany(function() {
        Crime.create(data);
    });
  });
}

if(seeds.cities) {
  console.log('Seeding cities');
  // Insert all cities data
  Cities.find({}).deleteMany(function() {
      Cities.create(CitiesSeed);
  });
}
