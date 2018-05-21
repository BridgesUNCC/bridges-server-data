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

var LyricsSchema = new Schema({
  artist: String,
  song: String,
  album: String,
  lyrics: String,
  year: Number,
  genre: []
});

module.exports = {'model': mongoose.model('Lyrics', LyricsSchema), 'structure': structure};
