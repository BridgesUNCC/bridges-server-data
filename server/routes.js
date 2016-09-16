/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/tests', require('./api/test'));
  // app.use('/api/airports', require('./api/airports'));

  app.use('/auth', require('./auth'));

  app.use('/', function(req, res) {
    res.status(200).json({'hello':'there'});
  });


};
