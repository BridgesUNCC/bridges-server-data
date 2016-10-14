'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'game': 'String',
  'platform': 'String',
  'rating': 'Number',
  'genre': 'Array of String'
};

var GameSchema = new Schema({
  game: String,
  platform: String,
  rating: Number,
  genre: []
});

module.exports = {'model': mongoose.model('Game', GameSchema), 'structure': structure};
