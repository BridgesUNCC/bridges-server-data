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
exports.index = function(req, res) {
  Game.find(function (err, games) {
    if(err) { return handleError(res, err); }
    return res.status(200).json({
      'structure': structure,
      'data': games
    });
  });
};
