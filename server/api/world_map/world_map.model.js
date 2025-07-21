'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Define the schema for the Feature object
const WorldCountrySchema = new mongoose.Schema({
  "alpha-2": {
    type: String,
    required: true
  },
  "alpha-3": {
    type: String,
    required: true
  },
  "numeric-3": {
      type: Number,
      get: v => Math.round(v), //enforce integer
      set: v => Math.round(v), //enforce integer
      required: true
  },
  "name": {
    type: String,
      required: true
  },
    "divisions": {
	type: Map,
	of: Schema.Types.Mixed,
	required: true
    }
});

module.exports = {'model': mongoose.model('WorldCountry', WorldCountrySchema)};
