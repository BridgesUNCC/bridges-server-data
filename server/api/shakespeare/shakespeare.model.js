'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'title': 'String',
  'type': 'String',
  'text': 'String'
};

var ShakespeareSchema = new Schema({
  title: String,
  type: String,
  text: String,
});

module.exports = {'model': mongoose.model('Shakespeare', ShakespeareSchema), 'structure': structure};
