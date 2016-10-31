/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /shakespeare              ->  index
 * GET    /shakespeare/:title       ->  specific poem or play
 * GET    /shakespeare/poems        ->  all poems
 * GET    /shakespeare/plays        ->  all plays
 *        ..?format=simple          ->  returns only characters
 */

'use strict';

var ShakespeareModel = require('./shakespeare.model');
var Shakespeare = ShakespeareModel.model;
var structure = ShakespeareModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

/* remove from text and title from each element:
  all punctuation (any non-number and non-character elements)
  all newlines and tabs
*/
function removeCharacters(data) {
  data.forEach(function(text) {
    text.title = text.title.replace(/[^A-Za-z0-9 ]|([\n\t])/g, '').toLowerCase();
    text.text = text.text.replace(/[^A-Za-z0-9 ]|[\n\t]/g, '').toLowerCase();
  });
}

// Get all shakespeare works
exports.index = function(req, res) {
  var query = req.params.title ? { 'title': req.params.title } : {};
  var format = req.query.format || false;

  // Query for shakespeare data
  Shakespeare.find(query,{
    '_id': 0,
    'title': 1,
    'type': 1,
    'text': 1
  })
  .exec(function (err, shakespeare) {
    if(err) { return handleError(res, err); }

    if(format === 'simple') {
      removeCharacters(shakespeare);
    }

    // return the structure of the model and the shakespeare data
    return res.status(200).json({
      'structure': structure,
      'data': shakespeare
    });
  });
};

// Get all shakespeare poems
exports.poems = function(req, res) {
  var format = req.query.format || false;

  // Query for shakespeare data
  Shakespeare.find({ 'type': 'poem' }, {
    '_id': 0,
    'title': 1,
    'type': 1,
    'text': 1
  })
  .exec(function (err, shakespeare) {
    if(err) { return handleError(res, err); }

    if(format === 'simple') {
      removeCharacters(shakespeare);
    }

    // return the structure of the model and the shakespeare data
    return res.status(200).json({
      'structure': structure,
      'data': shakespeare
    });
  });
};

// Get all shakespeare works
exports.plays = function(req, res) {
  var format = req.query.format || false;

  // Query for plays
  Shakespeare.find({ 'type': 'play' }, {
    '_id': 0,
    'title': 1,
    'type': 1,
    'text': 1
  })
  .exec(function (err, shakespeare) {
    if(err) { return handleError(res, err); }

    if(format === 'simple') {
      removeCharacters(shakespeare);
    }

    // return the structure of the model and the shakespeare data
    return res.status(200).json({
      'structure': structure,
      'data': shakespeare
    });
  });
};
