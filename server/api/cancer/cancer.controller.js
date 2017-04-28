/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /cancer              ->  index
 * GET     /cancer/count        ->  count
 */

'use strict';

var CancerModel = require('./cancer.model');
var Cancer = CancerModel.model;
var structure = CancerModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.count = function(req, res) {
  Cancer.count()
  .exec(function (err, count) {
    if(err) { return handleError(res, err); }

    // return the count of Cancer datapoints
    return res.status(200).json({
      'count': count
    });
  });
};


// Get list of Cancer data
exports.index = function(req, res) {
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 5) ?
        req.query.limit // use valid limit
        : 5;        // use actual number

  // Query for <limit> cancer records
  Cancer.find({},
    {'_id': 0,
     '__v': 0
    }
  )
  .limit(limit)
  .exec(function (err, cancer) {
    if(err) { return handleError(res, err); }
    // return the structure of the model and the cancer data
    return res.status(200).json({
      'structure': structure,
      'data': cancer
    });
  });
};
