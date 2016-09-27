/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /tests              ->  index
 */

'use strict';

var Test = require('./test.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of test data
exports.index = function(req, res) {
  console.log('querying...');
  Test.find(function (err, tests) {
    console.log('queried!');
    if(err) { return handleError(res, err); }
    return res.status(200).json(tests);
  });
};
