/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /cities              ->  index
 */

'use strict';

var WorldCitiesModel = require('./world_cities.model');
var WorldCities = WorldCitiesModel.model;
var structure = WorldCitiesModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get count of cities data
exports.count = function(req, res) {
  WorldCities.count()
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
  if(req.query.elevation){
    query.elevation = {$gt: req.query.elevation}
  }
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
  WorldCities.find(query,{
    '_id': 0,
    '__v': 0
  })
  .limit(limit)
  .lean().exec(function (err, cities) {
    if(err) { return handleError(res, err); }
    // return the structure of the model and the cities data
    return res.status(200).json({
      'structure': structure,
      'data': cities
    });
  });
};

exports.findOne = function(req, res) {
  WorldCities.count().exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count);

    WorldCities.findOne({},{
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
