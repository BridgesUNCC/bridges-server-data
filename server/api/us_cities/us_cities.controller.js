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

  //get the query for state and population for filtering
  var query = req.query.state ? { 'state': req.query.state } : {};
  query.population = req.query.population ? {$gt: req.query.population} : {$gt: 0}
  query.elevation = req.query.elevation ? {$gt: req.query.elevation} : {$gt: 0}
  const minll = req.query.minLatLong ? req.query.minLatLong.split(",") : [-10000, -10000];
  const maxll = req.query.maxLatLong ? req.query.maxLatLong.split(",") : [100000, 100000];
  if(req.query.minLatLong && req.query.maxLatLong){
    query.lat = {$gt: parseFloat(minll[0]), $lt: parseFloat(maxll[0])}
  }
  if(req.query.minLatLong && req.query.maxLatLong){
    query.lon = {$gt: parseFloat(minll[1]), $lt: parseFloat(maxll[1])}
  }
  // query.lat = (req.query.minLatLong && req.query.maxLatLong) ? {$gt: parseFloat(minll[0]), $lt: parseFloat(maxll[0])} : {}
  // query.lon = (req.query.minLatLong && req.query.maxLatLong) ? {$gt: parseFloat(minll[1]), $lt: parseFloat(maxll[1])} : {}

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
