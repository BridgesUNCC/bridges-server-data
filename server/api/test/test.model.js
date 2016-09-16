'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TestSchema = new Schema({
  attr1: String,
  attr2: Number,
  attr3: Boolean
});

module.exports = mongoose.model('Test', TestSchema);
