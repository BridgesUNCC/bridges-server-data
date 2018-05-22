'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'artist': 'String',
  'song': 'String',
  'album': 'String',
  'lyrics': 'String',
  'release_date': 'String'
};

var SongSchema = new Schema({
  artist: String,
  song: String,
  album: String,
  lyrics: String,
  release_date: String
});

module.exports = {'model': mongoose.model('Lyrics', SongSchema), 'structure': structure};
