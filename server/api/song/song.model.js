'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    SongModel;

var structure = {
  'artist': 'String',
  'song': 'String',
  'song_lower': 'String',
  'artist_lower': 'String',
  'album': 'String',
  'lyrics': 'String',
  'release_date': 'String'
};

var SongSchema = new Schema({
  artist: String,
  artist_lower: String,
  song: String,
  song_lower: String,
  album: String,
  lyrics: String,
  release_date: String
});

// save lower case versions of the song and artist for case insensitive searching
SongSchema.pre('save', function(next) {
  if(!this.song_lower) {
    this.song_lower = this.song.toLowerCase();
  }
  if(!this.artist_lower) {
    this.artist_lower = this.artist.toLowerCase();
  }
  next();
});

// create indexes on song name and (song name + artist) for fast searching
SongSchema.index( { song_lower: -1 } );
SongSchema.index( { song_lower: -1, artist_lower: -1 } );


SongModel = mongoose.model('Song', SongSchema);

SongModel.on('index', function(err) {
  if(err) console.log(err);
  console.log('created index on SongModel');
});

module.exports = {'model': SongModel, 'structure': structure};
