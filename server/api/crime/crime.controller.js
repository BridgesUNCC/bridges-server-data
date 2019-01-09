/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /crime              ->  index
 */

'use strict';

var CrimeModel = require('./crime.model');
var Crime = CrimeModel.model;
var structure = CrimeModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get count of crime data
exports.count = function(req, res) {
  Crime.count()
  .exec(function (err, count) {
    if(err) { return handleError(res, err); }

    // return the count of crime datapoints
    return res.status(200).json({
      'count': count
    });
  });
};

// Get list of crime data
exports.index = function(req, res) {
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 2524) ?
        +req.query.limit // use valid limit
        : 2524;        // use actual number

  // Query for <limit> crimes
  Crime.find({},{
    '_id': 0,
    '__v': 0
  })
  .limit(limit)
  .lean().exec(function (err, crimes) {
    if(err) { return handleError(res, err); }

    // return the structure of the model and the crime data
    return res.status(200).json({
      'structure': structure,
      'data': crimes
    });
  });
};

exports.findOne = function(req, res) {
  Crime.count().exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count);

    Crime.findOne({},{
      '_id': 0,
      '__v': 0
    })
    .skip(random)
    .exec(function(err, crime) {
      if(err) { return handleError(res, err); }

      // return the crime data
      return res.status(200).json(crime);
    });
  });
};
