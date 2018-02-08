/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /dataset              ->  index
 */

'use strict';

var DatasetModel = require('./dataset.model');
var Dataset = DatasetModel.model;

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of datasets
exports.raw = function(req, res) {

  // Query for all datasets
  Dataset.find({},{
    '_id': 0
  })
  // .limit(limit)
  .lean().exec(function (err, datasets) {
    if(err) { return handleError(res, err); }
    // return the raw dataset information
    return res.status(200).json(datasets);
  });
};

/* Helper function to get all dataset metadata */
exports.getDatasets = function(callback) {
  Dataset.find({},{
    '_id': 0
  })
  .lean().exec(function(err, datasets){
    callback(err, datasets);
  });
};

exports.index = function(req, res) {
  exports.getDatasets(function(err, datasets) {
    res.render('alldatasets', { title: 'BRIDGES Datasets', datasets: datasets});
  });
};
