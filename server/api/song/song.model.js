'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'artist': 'String',
  'song': 'String',
  'album': 'String',
  'lyrics': 'String',
  'year': 'Number',
  'genre': 'Array of String'
};

var SongSchema = new Schema({
  artist: String,
  song: String,
  album: String,
  lyrics: String,
  year: Number,
  genre: []
});

module.exports = {'model': mongoose.model('Lyrics', SongSchema), 'structure': structure};
