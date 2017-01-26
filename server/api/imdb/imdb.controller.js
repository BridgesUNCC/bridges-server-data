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

// Get list of IMDB data
exports.index = function(req, res) {
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 1000) ?
        req.query.limit // use valid limit
        : 1000;        // use actual number???

  // Query for <limit> actor movie pairs
  IMDB.find({},
    {'_id': 0,
     '__v': 0
    }
  )
  .limit(limit)
  .exec(function (err, imdb) {
    if(err) { return handleError(res, err); }

    // return the structure of the model and the IMDB data
    return res.status(200).json({
      'structure': structure,
      'data': imdb
    });
  });
};
