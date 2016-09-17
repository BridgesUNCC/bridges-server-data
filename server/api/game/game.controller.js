/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /games              ->  index
 */

'use strict';

var Game = require('./game.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of game data
exports.index = function(req, res) {
  Game.find(function (err, games) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(games);
  });
};
