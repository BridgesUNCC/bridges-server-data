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
  Test.find(function (err, tests) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tests);
  });
};
