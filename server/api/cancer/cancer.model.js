'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'Age': 'Object',
  'Year': 'Number',
  'Data': 'Object',
  'Area': 'String'
};

var CancerSchema = new Schema({
  Age: String,
  Year: Number,
  Data: Object,
  Area: String
});

module.exports = {'model': mongoose.model('Cancer', CancerSchema), 'structure': structure};
