'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'city': 'String',
  'state': 'String',
  'loc': 'Array of Double',
  'pops': 'Array of Integer'
};

var CitySchema = new Schema({
  city: String,
  state: String,
  loc: [],
  pops: []
});

module.exports = {'model': mongoose.model('City', CitySchema), 'structure': structure};
