/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

  // Insert routes below
  var datasets = require('./api/dataset');
  app.use('/api/datasets', datasets);

  app.use('/auth', require('./auth'));

  app.use('/api/tests', require('./api/test'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/songs', require('./api/song'));
  app.use('/api/books', require('./api/book'));
  app.use('/api/shakespeare', require('./api/shakespeare'));
  app.use('/api/imdb', require('./api/imdb'));
  app.use('/api/imdb2', require('./api/imdb2'));
  app.use('/api/cancer', require('./api/cancer'));
  app.use('/api/crime', require('./api/crime'));
  app.use('/api/cities', require('./api/cities'));
  app.use('/api/us_cities', require('./api/us_cities'));
  app.use('/api/world_cities', require('./api/world_cities'));

  app.get('*', function(req, res, next) {
    datasets.getDatasets(function(err, data){
      req.datasets = data;
      next();
    });
  }, function(req, res) {
    res.render('index', {title: 'BRIDGES Datasets', datasets:req.datasets});
  });

};
