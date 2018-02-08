/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /games              ->  index
 */

'use strict';

var GameModel = require('./game.model');
var Game = GameModel.model;
var structure = GameModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of game data
exports.raw = function(req, res) {
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 17534) ?
        req.query.limit // use valid limit
        : 17534;        // use actual number

  // Query for <limit> games
  Game.find({},{
    '_id': 0,
    'game': 1,
    'rating': 1,
    'platform': 1,
    'genre': 1
  })
  .limit(limit)
  .lean().exec(function (err, games) {
    if(err) { return handleError(res, err); }

    // return the structure of the model and the games data
    return res.status(200).json({
      'structure': structure,
      'data': games
    });
  });
};

exports.index = function(req, res) {
  res.render('dataset', { title: 'Game Dataset' });
};
