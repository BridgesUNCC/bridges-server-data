/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /lyrics              ->  index
 */

'use strict';

var LyricsModel = require('./lyrics.model');
var Lyrics = LyricsModel.model;
var structure = LyricsModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of lyrics data
exports.index = function(req, res) {
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 5) ?
        req.query.limit // use valid limit
        : 5;        // use actual number

  // Query for <limit> lyrics
  Lyrics.find({},{
    '_id': 0,
    'artist': 1,
    'song': 1,
    'album': 1,
    'lyrics': 1,
    'year': 1,
    'genre': 1
  })
  .limit(limit)
  .lean().exec(function (err, lyrics) {
    if(err) { return handleError(res, err); }

    // return the structure of the model and the lyrics data
    return res.status(200).json({
      'structure': structure,
      'data': lyrics
    });
  });
};

exports.findOne = function(req, res) {
  Lyrics.count().exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count);

    Lyrics.findOne({},{
      '_id': 0,
      'artist': 1,
      'song': 1,
      'album': 1,
      'lyrics': 1,
      'year': 1,
      'genre': 1
    })
    .skip(random)
    .exec(function(err, lyrics) {
      if(err) { return handleError(res, err); }

      // return the song data
      return res.status(200).json(lyrics);
    });
  });
};
