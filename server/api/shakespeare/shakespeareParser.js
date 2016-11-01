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
          'title': 'Sonnet ' + i,
          'type': 'poem',
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

        // adjust titles where appropriate
        if(title === '1605\n\n\nMeasure For Measure') title = 'Measure For Measure';
        else if(title === 'King Richard Iii') title = 'The Life and Death of Richard the Third';
        else if(title === 'Second Part Of King Henry Iv') title = 'The Second Part Of King Henry The Fourth';
        else if(title === 'The First Part Of Henry The Sixth') title = 'The First Part Of King Henry The Sixth';
        else if(title === 'King Henry The Eighth') title = 'The Life of King Henry the Eighth';
        else if(title === 'King Richard The Second') title = 'The Life and Death of Richard the Second';
        else if(title === 'Twelfth Night; Or, What You Will') title = 'Twelfth Night';
        else if(title === 'Alls Well That Ends Well') title = 'All\'s Well That Ends Well';

        // save play
        output.push({
          'title': title,
          'type': (title === 'A Lover\'s Complaint') ? 'poem': 'play',
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
    console.log('error!?');
    cb(err, []); // Error: "It broke"
  });
};
