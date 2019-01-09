/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /songs              ->  index
 */

'use strict';

var SongModel = require('./song.model');
var Song = SongModel.model;
var structure = SongModel.structure;
const { spawn } = require('child_process');

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of song data
exports.index = function(req, res) {
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 1000) ?
        +req.query.limit // use valid limit
        : 1000;        // use max

  // Query for <limit> songs
  Song.find({},{
    '_id': 0,
    'artist': 1,
    'song': 1,
    'album': 1,
    'lyrics': 1,
    'release_date': 1
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

function saveNewSong(data) {
  var newSong = JSON.parse(data);
  Song.findOne({
    song: newSong.song,
    artist: newSong.artist
  }).exec(function(err, song) {
      if(err) { console.log(err); }
      if(song) {
        console.log('Song already exists in database');
      } else {
        Song.create(newSong, function (err, song) {
          if (err) { console.log(err); }
          console.log('saved Song:', song.song);
        });
      }
  });
}

function queryGeniusAPI(req, res, songName, artist) {
  var responseData = '';
  var error = '';
  const scriptPath = __dirname + '/GeniusSearch.py';
  const pythonScript = spawn('python', [scriptPath, process.env.GENIUS_API, songName, artist]);

  pythonScript.stdout.on('data', (buf) => {
      responseData = buf.toString();
  });
  pythonScript.stderr.on('data', (myErr) => {
      pythonScript.stdin.pause();
      error = myErr.toString();
  });
  pythonScript.on('close', (code) => {
    // console.log(
    //   `child process terminated due to receipt of code ${code}`);
    if(code === 0 && responseData.length > 0 && error.length === 0) {
      saveNewSong(responseData);
      return res.status(200).json(JSON.parse(responseData));
    }
    else {
      if(error.length > 0) {
        return res.status(404).json(error);
      } else {
        return handleError(res, 'Unable to complete the request at this time.');
      }
    }
  });
}

exports.find = function(req, res) {
  var songName = req.params.songname;
  var artist = req.query.artistName || '';
  var query = {
    'song_lower': songName.toLowerCase()
  };
  // add artist to search query if provided
  if(artist.length > 0) { query.artist_lower = artist.toLowerCase(); }

  Song.findOne(query)
  .exec(function(err, song) {
    if(err) { return res.status(404).json(err); }

    if(song !== null) {
      return res.status(200).json(song);
    } else {
      return queryGeniusAPI(req, res, songName, artist);
    }
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
      'release_date': 1
    })
    .skip(random)
    .exec(function(err, songs) {
      if(err) { return handleError(res, err); }

      // return the song data
      return res.status(200).json(songs);
    });
  });
};
