/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /shakespeare              ->  index
 * GET    /shakespeare/:title       ->  specific poem or play
 * GET    /shakespeare/poems        ->  all poems
 * GET    /shakespeare/plays        ->  all plays
 * GET    /shakespeare/titles       ->  all titles
 *        ..?format=simple          ->  returns only characters
 */

'use strict';

var ShakespeareModel = require('./shakespeare.model');
var Shakespeare = ShakespeareModel.model;
var structure = ShakespeareModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

/* clean text for each element:
  remove all punctuation (any non-number and non-character elements)
    (except hyphens separating words)
  remove all newlines, tabs, and extra spaces
  convert to all lower case
*/
function removeCharacters(data) {
  data.forEach(function(text) {
    text.text = text.text.replace(/[\n\t]/g, ' ');  // replace line breaks with spaces
    text.text = text.text.replace(/[^-A-Za-z0-9 ]/g, '').toLowerCase();
    text.text = text.text.replace(/  +/g, ' '); // force single spaces
    text.text = text.text.replace(/(\-+\s)|(\s\-+)/g, ' '); // only keep hyphens separating words
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

    // return the structure of the model and the shakespeare poems
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

    // return the structure of the model and the shakespeare plays
    return res.status(200).json({
      'structure': structure,
      'data': shakespeare
    });
  });
};

exports.titles = function(req, res) {
  // Query for plays
  Shakespeare.find({}, {
    '_id': 0,
    'title': 1
  })
  .exec(function (err, shakespeare) {
    if(err) { return handleError(res, err); }

    var titles = [];
    for(var w in shakespeare) {
      titles.push(shakespeare[w].title);
    }

    // return the shakespeare titles
    return res.status(200).json({
      'data': titles
    });
  });
};
