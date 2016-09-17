'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  game: String,
  platform: String,
  score: Number,
  genre: []
});

module.exports = mongoose.model('Game', GameSchema);
