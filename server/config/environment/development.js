'use strict';
//var MONGO_CREDENTIALS = process.env.MONGO_CREDENTIALS || require('../local.env.js').MONGO_CREDENTIALS;
// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/bridgesdata-dev'
    // uri: 'mongodb://' + MONGO_CREDENTIALS + '@mongo:27017'   // connect to mongo container (when running on container)
    // uri: 'mongodb://' + MONGO_CREDENTIALS + '@localhost:3333' // connect to mongo container (when running on host)
  },

  seedDB: true
};
