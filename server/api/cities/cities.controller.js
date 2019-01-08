/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /cities              ->  index
 */

'use strict';

var CitiesModel = require('./cities.model');
var Cities = CitiesModel.model;
var structure = CitiesModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get count of cities data
exports.count = function(req, res) {
  Cities.count()
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
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 769) ?
        req.query.limit // use valid limit
        : 769;        // use actual number

  // Query for <limit> cities
  Cities.find({},{
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
  Cities.count().exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count);

    Cities.findOne({},{
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
