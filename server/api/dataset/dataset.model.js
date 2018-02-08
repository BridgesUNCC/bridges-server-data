'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// var structure = {
//   'dataset': 'String',
//   'endpoint': 'String',
//   'description': 'Number',
//   'size': 'Array of String',
//   'references': 'Array of String',
//   'examples': 'Array of String'
// };

var DatasetSchema = new Schema({
  'dataset': String,
  'endpoint': String,
  'description': String,
  'size': String,
  'references': [],
  'examples': []
});

module.exports = {'model': mongoose.model('Dataset', DatasetSchema)};
