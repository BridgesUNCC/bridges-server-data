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
  app.use('/api/cancer', require('./api/cancer'));
  app.use('/api/crime', require('./api/crime'));

  app.use('/auth', require('./auth'));

  app.use('/api/datasets', function(req, res){
    var datasets = {
      'games': {'endpoint': '/api/games', 'description': 'Curated IGN Video Game Ratings', 'reference': '', 'size': '1.6 MB'},
      'books': {'endpoint': '/api/books', 'description': 'Metadata from the top 1000 books (by download) from Project Gutenberg', 'reference': '', 'size': '387 KB'},
      'shakespeare': {'endpoint': '/api/shakespeare', 'description': 'The entire works of Shakespeare', 'reference': '', 'size': '5 MB'},
      'imdb': {'endpoint': '/api/imdb', 'description': 'Curated actor/movie pairs from IMDB', 'reference': '', 'size': '120 KB'},
      'cancer': {'endpoint': '/api/cancer', 'description': 'Cancer incidence and mortality rates', 'reference': '', 'size': '6.9 MB'},
      'crime': {'endpoint': '/api/crime', 'description': 'Homicide rates and proportions in US states from 1986 to 2015', 'reference': '', 'size': '325 KB'}
    };

    res.json(datasets);
  });

  // app.use('/', function(req, res) {
  //   res.status(200).json({'hello':'there!'});
  // });

  app.get('*', function(req, res) {
    // res.sendFile('index.html', {'root': __dirname + '/../public'}); // load the single view file
    res.redirect('/');
  });

};
