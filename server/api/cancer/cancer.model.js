'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'Age': 'Object',
  'Year': 'Number',
  'Data': 'Object',
  'Area': 'String',
  'loc': 'Array of Doubles'
};

var CancerSchema = new Schema({
  Age: Object,
  Year: Number,
  Data: Object,
  Area: String,
  loc: Array
});

module.exports = {'model': mongoose.model('Cancer', CancerSchema), 'structure': structure};
