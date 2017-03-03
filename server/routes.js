/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/tests', require('./api/test'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/books', require('./api/book'));
  app.use('/api/shakespeare', require('./api/shakespeare'));
  app.use('/api/imdb', require('./api/imdb'));
  app.use('/api/imdb2', require('./api/imdb2'));

  app.use('/auth', require('./auth'));

  app.use('/', function(req, res) {
    res.status(200).json({'hello':'there!'});
  });
};
