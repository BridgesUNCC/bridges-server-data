/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /cities              ->  index
 */

'use strict';

var USCitiesModel = require('./us_cities.model');
var USCities = USCitiesModel.model;
var structure = USCitiesModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get count of cities data
exports.count = function(req, res) {
  USCities.count()
  .exec(function (err, count) {
    if(err) { return handleError(res, err); }

    // return the count of cities datapoints
    return res.status(200).json({
      'count': count
    });
  });
};

// Get list of cities data
exports.index = function(req, res) {
  //check the query for limit of results to get
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 100000) ?
        +req.query.limit // use valid limit
        : 100000;        // use actual number

  let minElevation = (req.query.minElevation) ? req.query.minElevation : 0;
  let maxElevation = (req.query.maxElevation) ? req.query.maxElevation : Infinity;

  let minPopulation = (req.query.minPopulation) ? req.query.minPopulation : 0;
  let maxPopulation = (req.query.maxPopulation) ? req.query.maxPopulation : Infinity;

  var minLat = req.query.minLat ? Number(req.query.minLat) : -90;
  let minLong = (req.query.minLong) ? req.query.minLong : -180;
  console.log(minLat)
  let maxLat = req.query.maxLat ? req.query.maxLat : 90;
  let maxLong = (req.query.maxLong) ? req.query.maxLong : 180;


  //get the query for state and population for filtering
  var query = {};
  if(req.query.city){
    query.city = req.query.city;
  }
  if(req.query.state){
    query.state = req.query.state;
  }
  if(req.query.timezone){
    query.timezone = req.query.timezone;
  }
  query.population = {$gt: minPopulation, $lt: maxPopulation};
  query.elevation = {$gt: minElevation, $lt: maxElevation};
  query.lat = {$gt: minLat, $lt: maxLat};
  query.lon = {$gt: minLong, $lt: maxLong};
  
  // Query for <limit> cities
  USCities.find(query,{
    '_id': 0,
    '__v': 0
  })
  .limit(limit)
  .lean().exec(function (err, cities) {
    if(err) { return handleError(res, err); }
    console.log("hello")
    // return the structure of the model and the cities data
    return res.status(200).json({
      'structure': structure,
      'data': cities
    });
  });
};

exports.findOne = function(req, res) {
  USCities.count().exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count);

    USCities.findOne({},{
      '_id': 0,
      '__v': 0
    })
    .skip(random)
    .exec(function(err, cities) {
      if(err) { return handleError(res, err); }

      // return the cities data
      return res.status(200).json(cities);
    });
  });
};

exports.state = function(req, res) {
  // Query for <limit> cities
  var query = req.query.state ? { 'state': req.query.state } : {};
  USCities.find(query,{
    '_id': 0,
    '__v': 0
  })
  .lean().exec(function (err, cities) {
    if(err) { return handleError(res, err); }
    // return the structure of the model and the cities data
    return res.status(200).json({
      'structure': structure,
      'data': cities
    });
  });
};
