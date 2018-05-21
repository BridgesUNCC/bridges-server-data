/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /songs              ->  index
 */

'use strict';

var SongModel = require('./song.model');
var Song = SongModel.model;
var structure = SongModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of song data
exports.index = function(req, res) {
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 5) ?
        req.query.limit // use valid limit
        : 5;        // use actual number

  // Query for <limit> songs
  Song.find({},{
    '_id': 0,
    'artist': 1,
    'song': 1,
    'album': 1,
    'lyrics': 1,
    'year': 1,
    'genre': 1
  })
  .limit(limit)
  .lean().exec(function (err, songs) {
    if(err) { return handleError(res, err); }

    // return the structure of the model and the song data
    return res.status(200).json({
      'structure': structure,
      'data': songs
    });
  });
};

exports.findOne = function(req, res) {
  Song.count().exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count);

    Song.findOne({},{
      '_id': 0,
      'artist': 1,
      'song': 1,
      'album': 1,
      'lyrics': 1,
      'year': 1,
      'genre': 1
    })
    .skip(random)
    .exec(function(err, songs) {
      if(err) { return handleError(res, err); }

      // return the song data
      return res.status(200).json(songs);
    });
  });
};
