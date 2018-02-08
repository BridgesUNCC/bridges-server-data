/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  var datasets = require('./api/dataset');
  app.use('/api/datasets', datasets);

  app.use('/auth', require('./auth'));

  app.use('/api/tests', require('./api/test'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/books', require('./api/book'));
  app.use('/api/shakespeare', require('./api/shakespeare'));
  app.use('/api/imdb', require('./api/imdb'));
  app.use('/api/imdb2', require('./api/imdb2'));
  app.use('/api/cancer', require('./api/cancer'));
  app.use('/api/crime', require('./api/crime'));


  // app.use('/snippets/:dataset', function(req, res) {
  //   // make sure the dataset is valid
  //   if(req.params.dataset && datasets[req.params.dataset]) {
  //     res.redirect('https://raw.githubusercontent.com/UNCCBridges/BridgesDataSnippets/master/' + datasets[req.params.dataset].snippet);
  //   }
  // });

  app.get('*', function(req, res, next) {
    datasets.getDatasets(function(err, data){
      req.datasets = data;
      next();
    });
  }, function(req, res) {
    res.render('index', {title: 'BRIDGES Datasets', datasets:req.datasets});
  });

};
