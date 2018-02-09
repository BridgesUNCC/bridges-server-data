/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /imdb              ->  index
 */

'use strict';

var IMDBModel = require('./imdb.model');
var IMDB = IMDBModel.model;
var structure = IMDBModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.count = function(req, res) {
  IMDB.count()
  .exec(function (err, count) {
    if(err) { return handleError(res, err); }

    // return the count of IMDB datapoints
    return res.status(200).json({
      'count': count
    });
  });
};


// Get list of IMDB data
exports.index = function(req, res) {
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 1814) ?
        req.query.limit // use valid limit
        : 1814;        // use actual number

  // Query for <limit> actor movie pairs
  IMDB.find({},
    {'_id': 0,
     '__v': 0
    }
  )
  .limit(limit)
  .lean().exec(function (err, imdb) {
    if(err) { return handleError(res, err); }

    // return the structure of the model and the IMDB data
    return res.status(200).json({
      'structure': structure,
      'data': imdb
    });
  });
};

exports.findOne = function(req, res) {
  IMDB.count().exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count);

    IMDB.findOne({},{
      '_id': 0,
      '__v': 0
    })
    .skip(random)
    .exec(function(err, imdb) {
      if(err) { return handleError(res, err); }

      // return the imdb data
      return res.status(200).json(imdb);
    });
  });
};
