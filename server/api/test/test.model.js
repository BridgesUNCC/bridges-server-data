'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TestSchema = new Schema({
  attr1: String,
  attr2: Number,
  attr3: Boolean,
  attr4: {
    attr5: String,
    attr6: Number
  }
});

module.exports = mongoose.model('Test', TestSchema);
