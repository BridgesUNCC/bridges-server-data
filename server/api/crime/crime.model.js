'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'city': 'String',
  'loc': 'Array of Double',
  'year': 'Integer',
  'numMonths': 'Integer',
  'totalPop': 'Integer',
  'numHomicides': 'Integer',
  'homicideRate': 'Double'
};

var CrimeSchema = new Schema({
  city: String,
  loc: [],
  year: Number,
  numMonths: Number,
  totalPop: Number,
  numHomicides: Number,
  homicideRate: Number
});

module.exports = {'model': mongoose.model('Crime', CrimeSchema), 'structure': structure};
