'use strict';
var path = require('path');
var fs = require('fs');
var output = [];

function getPairs() {
  var allData = [],
      pair, actor, movie = '';

  return new Promise(function(resolve, reject) {
    fs.readFile(path.resolve(__dirname, 'imdb.txt'), 'utf8', function(err, data) {
      if(err) { reject(err); }
        allData = data.split('\r\n');
        for(var i in allData) {
          pair = allData[i].split(' ');
          actor = pair[0];
          movie = pair[1];
          if(actor && movie) {
            output.push({'actor': actor, 'movie': movie});
          }
      }
      resolve();
    });
  });
}

getPairs();

module.exports = function(cb) {
  getPairs().then(function() {
    cb(null, output);
  }, function(err) {
    console.log('error!?');
    cb(err, []); // Error: "It broke"
  });
};
