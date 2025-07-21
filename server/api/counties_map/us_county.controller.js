/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /cities              ->  index
 */

'use strict';

var USCountyModel = require('./us_county.model');
var USCounty = USCountyModel.model;
// var structure = USCitiesModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}


// Get list of cities data
exports.index = function(req, res) {
  
  const stateName = "California"; // Example state name

// Construct a query to find features within the specified distance from the point
const query = {
  "geometry.type": "Polygon", // Filter based on the geometry type (only polygons)
  "properties.GEOID": "01005" // Filter based on the state name
};
  
  // Query for <limit> cities
  USCounty.find(query)
  .exec(function (err, cities) {
    if(err) { return handleError(res, err); }
    console.log("ehh")
    // return the structure of the model and the cities data
    return res.status(200).json({
      'data': cities
    });
  });
};


