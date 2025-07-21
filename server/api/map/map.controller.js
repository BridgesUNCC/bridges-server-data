/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /cities              ->  index
 */

'use strict';

var USCountyModel = require('../counties_map/us_county.model');
var USStatesModel = require('../state_map/us_states.model')
var USCounty = USCountyModel.model;
var USStates = USStatesModel.model;

function handleError(res, err) {
  return res.status(500).send(err);
}

async function getState(query){
  return new Promise((resolve, reject) => {
    USStates.find(query, (err, result)=>{
      resolve(result)
    })
  })
}

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

function formatFinalJSON(){
  let finalResult = {};

}


// Get list of cities data
exports.index = async function(req, res) {

  // Construct a regular expression for each state name, case-insensitive
  const regexStateNames = req.query.state.split(',').map(state => new RegExp(state, 'i'));
  
  var query = {
    "properties.NAME": {$in: regexStateNames}
  };

  var stateInfo = await getState(query);

  let stateFIPS = [];
  for(let i = 0; i < stateInfo.length; i++){
    stateFIPS.push({'FIPS': stateInfo[i].properties.STATEFP, 'Name': stateInfo[i].properties.NAME});
  }

  console.log(req.query.state)
  console.log(stateInfo);
  console.log(stateFIPS);

  ////////////////////
  //Sample basic query
  ////////////////////
  // const query1 = {
  //   "geometry.type": "Polygon", // Filter based on the geometry type (only polygons)
  //   "properties.GEOID": "01005" // Filter based on the state name
  // };


  ////////////////////////////
  //query for spatial geometry
  ////////////////////////////

  //USCounty.find({'geometry': {
  //     $geoWithin: {
  //       $geometry: stateInfo[0].geometry
  //     }
  //   }
  // })
  //   .exec(function (err, cities) {
  //     if(err) { return handleError(res, err); }
  //     console.log("ehh")
  //     // return the structure of the model and the cities data
  //     return res.status(200).json({
  //       'data': cities
  //     });
  //   });
  // };

  USCounty.aggregate([
    {
      $match:{
        'properties.FIPS_CODE': {$in: stateFIPS.map(stateFIPSCode => new RegExp(`^${stateFIPSCode.FIPS}-`))}
      }
    },
    {
      $group:{
        //_id: { $substr: ['$properties.FIPS_CODE', 0, 2] },
        _id: {
          input: { $arrayElemAt: [{ $split: ['$properties.COUNTY_STATE_NAME', ', '] }, 1] } // Extract the state name after splitting by comma
        },
        counties: {$push: '$$ROOT'}
      }
    },
    {
      $project: {
        counties: {
          _id: 0,
          geometry: 0,
        }
      }
    }
  ]).exec(function (err, cities) {
    if(err) { return handleError(res, err); }
    console.log("Got Counties")
    // return the structure of the model and the cities data
    return res.status(200).json({
      'data': cities
    });
  });

  ////////////////////
  //Query by FIPS code
  ////////////////////

  // USCounty.find({'properties.FIPS_CODE': {
  //   $in: stateFIPS.map(stateFIPSCode => new RegExp(`^${stateFIPSCode}-`))
  // }
  // })
  // .exec(function (err, cities) {
  //   if(err) { return handleError(res, err); }
  //   console.log("Got Counties")
  //   // return the structure of the model and the cities data
  //   return res.status(200).json({
  //     'data': cities
  //   });
  // });
};


