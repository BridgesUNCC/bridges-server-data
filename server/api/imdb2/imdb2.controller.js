/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /imdb2              ->  index
 */

'use strict';

var IMDB2Model = require('./imdb2.model');
var IMDB2 = IMDB2Model.model;
var structure = IMDB2Model.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.count = function(req, res) {
  IMDB2.count()
  .exec(function (err, count) {
    if(err) { return handleError(res, err); }

    // return the count of IMDB2 datapoints
    return res.status(200).json({
      'count': count
    });
  });
};


// Get list of IMDB2 data
exports.index = function(req, res) {
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 484) ?
        req.query.limit // use valid limit
        : 484;        // use actual number

  // Query for <limit> actor movie pairs
  IMDB2.find({},
    {'_id': 0,
     '__v': 0
    }
  )
  .limit(limit)
  .exec(function (err, imdb2) {
    if(err) { return handleError(res, err); }
    // return the structure of the model and the IMDB2 data
    return res.status(200).json({
      'structure': structure,
      'data': imdb2
    });
  });
};
