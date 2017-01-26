'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'actor': 'String',
  'movie': 'String'
};

var IMDBSchema = new Schema({
  actor: String,
  movie: String
});

module.exports = {'model': mongoose.model('IMDB', IMDBSchema), 'structure': structure};
