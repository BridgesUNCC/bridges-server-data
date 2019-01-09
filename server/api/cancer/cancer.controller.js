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
                +req.query.limit <= 22140) ?
        +req.query.limit // use valid limit
        : 22140;        // use actual number

  // Query for <limit> cancer records
  Cancer.find({},
    {'_id': 0,
     '__v': 0
    }
  )
  .limit(limit)
  .lean().exec(function (err, cancer) {
    if(err) { return handleError(res, err); }
    // return the structure of the model and the cancer data
    return res.status(200).json({
      'structure': structure,
      'data': cancer
    });
  });
};

// Get list of Cancer data with locations
exports.withLoc = function(req, res) {
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 22140) ?
        +req.query.limit // use valid limit
        : 22140;        // use actual number

  // Query for <limit> cancer records
  Cancer.find({'loc':{$ne:null}},
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


// Get stats for Cancer data
exports.stats = function(req, res) {
  //https://www.cdc.gov/cancer/npcr/uscs/glossary.htm

  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 22140) ?
        +req.query.limit // use valid limit
        : 22140;        // use actual number

  // Query for <limit> cancer records
  Cancer.find({},
    {'_id': 0,
     '__v': 0
    }
  )
  .limit(limit)
  .exec(function (err, cancer) {
    if(err) { return handleError(res, err); }

    var allStates = {};
    var locs = [];
    var addCount = 0;

    for(var c in cancer) {
      if (allStates.hasOwnProperty(cancer[c].Area)) {
        // console.log('exists!');
        if(allStates[cancer[c].Area].hasOwnProperty(cancer[c].Year)) {
          if(allStates[cancer[c].Area][cancer[c].Year].hasOwnProperty(cancer[c].Data['Event Type'])) {
            allStates[cancer[c].Area][cancer[c].Year][cancer[c].Data['Event Type']]++;
          } else {
            allStates[cancer[c].Area][cancer[c].Year][cancer[c].Data['Event Type']] = 1;
          }
        } else {
          allStates[cancer[c].Area][cancer[c].Year] = {};
          allStates[cancer[c].Area][cancer[c].Year][cancer[c].Data['Event Type']] = 1;
        }


      } else {
        locs.push(cancer[c].Area);
        allStates[cancer[c].Area] = {};
        allStates[cancer[c].Area][cancer[c].Year] = {};
        allStates[cancer[c].Area][cancer[c].Year][cancer[c].Data['Event Type']] = 1;
      }
    }


    // return
    return res.status(200).json({
      hi: allStates,
      locs: locs
    });
  });
};

exports.findOne = function(req, res) {
  Cancer.count().exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count);

    Cancer.findOne({},{
      '_id': 0,
      '__v': 0
    })
    .skip(random)
    .exec(function(err, cancer) {
      if(err) { return handleError(res, err); }

      // return the cancer data
      return res.status(200).json(cancer);
    });
  });
};
