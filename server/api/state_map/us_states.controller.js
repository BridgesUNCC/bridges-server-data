/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /cities              ->  index
 */

'use strict';

var USStatesModel = require('./us_states.model');
var USStates = USStatesModel.model;
// var structure = USCitiesModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}


// Get list of cities data
exports.index = function(req, res) {
  
  const stateName = "California"; // Example state name

  // Construct a query to find features within the specified distance from the point
  const query = {
    "properties.NAME": "Nebraska" // Filter based on the state name
  };
  
  // Query for <limit> cities
  USStates.find(query)
  .exec(function (err, cities) {
    if(err) { return handleError(res, err); }
    console.log("ehh")
    // return the structure of the model and the cities data
    return res.status(200).json({
      'data': cities
    });
  });
};


