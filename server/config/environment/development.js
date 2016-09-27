'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    // uri: 'mongodb://localhost/bridgesdata-dev'
    uri: 'mongodb://admin:password@mongo:27017'   // connect to mongo container (when running on container)
    // uri: 'mongodb://admin:password@localhost:3333' // connect to mongo container (when running on host)
  },

  seedDB: true
};
