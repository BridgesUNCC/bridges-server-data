'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'actor': 'String',
  'movie': 'String',
  'rating': 'Float',
  'genres': 'Array of String'
};

var IMDB2Schema = new Schema({
  actor: String,
  movie: String,
  rating: Number,
  genres: Array
});

module.exports = {'model': mongoose.model('IMDB2', IMDB2Schema), 'structure': structure};
