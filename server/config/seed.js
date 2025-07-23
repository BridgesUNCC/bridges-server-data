/**
 * Populate DB with data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

console.log('Seeding DB');

//You should really only set these to true when you seed the dataset.
//You should probably seed the dataset one at a time.
//Leaving one of these flag to true in production is a race condition on the database waiting to happen.
//Don't do it.
//You've been warned!
//-- Erik (Jul 21, 2025)
var seeds = {
  'datasets': false, 
  'tests': false,
  'games': false,
  'books': false,
  'song': false,
  'shakespeare': false,
  'imdb': false,
  'imdb2': false,
  'cancer': false,
  'crime': false,
  'cities': false,
  'us_cities': false,
    'world_cities': false, //seeding the world cities quite some time. monitor the database to confirm that the data is there. There should be over 100,000 cities at the end. Probably over 30 minutes
  'us_county': false,
    'states': false,
    'world_map': false
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
var USCities = require('../api/us_cities/us_cities.model').model;
var WorldCities = require('../api/world_cities/world_cities.model').model;
var USCounty = require('../api/counties_map/us_county.model').model;
var USStates = require('../api/state_map/us_states.model').model;
var WorldCountry = require('../api/world_map/world_map.model').model;

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
var USCitiesSeed = require('../api/us_cities/us_cities.json');
var WorldCitiesSeed = require('../api/world_cities/world_cities.json');
var USCountySeed = require('../api/counties_map/county.json');
var USStatesSeed = require('../api/state_map/states.json');
var WorldCountrySeed = require('../api/world_map/world-countries-iso-3166.json');


//The models have a .create function that you can use to upload a list of documents at cone. But that function has no recovery mecanism in cases of failure.
//uploadDocumentsOneByOne has recovery features that should be better for very large document sets.
async function uploadDocumentsOneByOne(Model, documents, maxRetries = 5, retryDelayMs = 1000) {

  const failedDocuments = []; // To keep track of documents that ultimately failed

  console.log(`Starting individual document upload for ${documents.length} documents.`);

    for (let i = 0; i < documents.length; i++) {
	if (i % 10000 == 0) {
	    console.log("uploading doc "+String(i) +" of "+String(documents.length));
	}
    const docData = documents[i];
    let attempts = 0;
    let success = false;
    let createdDocument = null;

    // Create a new Mongoose document instance
    // If the document data already has an _id, Mongoose will try to create/update with that _id.
    // If not, Mongoose will generate one.
    const docToSave = new Model(docData);

    
      
    while (attempts < maxRetries && !success) {
      attempts++;
      try {
        createdDocument = await docToSave.save(); // Attempt to save the single document
        success = true;
          //console.log(`  [${i + 1}/${documents.length}] Successfully uploaded document (ID: ${createdDocument._id})`);
      } catch (error) {
        console.error(`  [${i + 1}/${documents.length}] Error uploading document (Attempt ${attempts}/${maxRetries}):`, error.message);

        if (attempts < maxRetries) {
          console.log(`  Retrying document (ID: ${docToSave._id || 'new'}) in ${retryDelayMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelayMs));
        } else {
          console.error(`  Failed to upload document (ID: ${docToSave._id || 'new'}) after ${maxRetries} attempts. Skipping.`);
          failedDocuments.push(docData); // Store the original data of the failed document
        }
      }
    }
  }

  console.log("Individual document upload process completed.");
  if (failedDocuments.length > 0) {
    console.error(`Total documents that failed to upload: ${failedDocuments.length}`);
    // You might want to return or log the actual data of the failed documents for review
    return failedDocuments;
  }
  return []; // Return empty array if all succeeded
}


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
      uploadDocumentsOneByOne(Cities, CitiesSeed);
  });
}

if(seeds.us_cities) {
  console.log('Seeding us_cities');
  // Insert all cities data
  USCities.find({}).deleteMany(function() {
      uploadDocumentsOneByOne(USCities, USCitiesSeed);
  });
}



if(seeds.world_cities) {
  console.log('Seeding world_cities');
  // Insert all cities data
    WorldCities.find({}).deleteMany(function() {
	uploadDocumentsOneByOne(WorldCities, WorldCitiesSeed);
  });
}


if(seeds.us_county){
  console.log('Seeding US Counties');
  USCounty.find({}).deleteMany(function (){
      uploadDocumentsOneByOne(USCounty, USCountySeed);
  });
}

if(seeds.states){
  console.log('Seeding US States');
  USStates.find({}).deleteMany(function (){
      uploadDocumentsOneByOne(USStates,USStatesSeed);
  });
}

if(seeds.world_map){
  console.log('Seeding World Map');
  WorldCountry.find({}).deleteMany(function (){
      uploadDocumentsOneByOne(WorldCountry, WorldCountrySeed);
  });
}
