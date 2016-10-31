'use strict';
var path = require('path');
var fs = require('fs');
var output = [];

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function getSonnets() {
  var sonnet;

  return new Promise(function(resolve, reject) {
    fs.readFile(path.resolve(__dirname, 'shakespeare.txt'), 'utf8', function(err, data) {
      if(err) { reject(err); }

      // replace extra spaces with spaces
      data = data.replace(/ +/g, ' ');

      // parse sonnets
      for(var i = 1; i <= 154; i++) {

        // add offset based on sonnet number
        var offset = (i < 10) ? 1 : (i < 100) ? 2 : 3;

        // grab sonnet from data
        if( i < 154) {
          sonnet = data.substring(data.indexOf(i) + offset, data.indexOf(i+1)).trim();
        } else {
          sonnet = data.substring(data.indexOf(i) + offset, data.indexOf('THE END')).trim();
        }

        // remove extra spaces from successive lines
        // sonnet = sonnet.replace(/\n /g, '\n');

        // save sonnet
        output.push({
          'title': i + '',
          'type': 'sonnet',
          'text': sonnet
        });
      }
      resolve();
    });
  });
}

function getPlays() {
  var play, title = '';

  return new Promise(function(resolve, reject) {
    fs.readFile(path.resolve(__dirname, 'shakespeare.txt'), 'utf8', function(err, data) {
      if(err) { reject(err); }

      // replace extra spaces with spaces and replace <<..>> with newlines
      data = data.replace(/ +/g, ' ').replace(/<[\s\S]*?>>/g, '');

      var start = data.indexOf('THE END') + 7;

      // parse plays
      while(title !== 'A Lover\'s Complaint') {
        play = data.substring(start, data.indexOf('THE END', start)).trim();  // get entire play
        // play = play.replace(/<[\s\S]*?>>/g, ""); // remove <<...>> text
        title = play.substring(4, play.indexOf('by')).trim().toProperCase(); // extract title
        play = play.replace(/\n\n\n+/g, '\n\n'); // remove extraneous linebreaks

        // save play
        output.push({
          'title': title,
          'type': 'play',
          'text': play
        });

        start = data.indexOf('THE END', start) + 7;
      }

      resolve();
    });
  });
}

// export a function with a callback to allow asynchronous reading
module.exports = function(cb) {
  getSonnets().then(function() {
    return getPlays();
  }).then(function() {
    cb(null, output);
  }, function(err) {
    cb(err, []); // Error: "It broke"
  });
};
