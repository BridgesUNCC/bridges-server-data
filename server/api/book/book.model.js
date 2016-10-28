'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'author': 'Object name: String, birth: String, death: String',
  'title': 'String',
  'languages': 'Array of String',
  'genres': 'Array of String',
  'subjects': 'Array of String',
  'metrics': 'Object characters: Number, words: Number, sentences: Number, difficult_words: Number',
  'url': 'String',
  'downloads': 'Number'
};

var BookSchema = new Schema({
  author: Object,
  title: String,
  languages: [],
  subjects: [],
  genres: [],
  metrics: Object,
  url: String,
  downloads: Number
});

module.exports = {'model': mongoose.model('Book', BookSchema), 'structure': structure};
