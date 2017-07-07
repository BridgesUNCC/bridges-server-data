'use strict';
var path = require('path');
var fs = require('fs');
var output = [];

function extractCity(rawCity) {
  var city = '';
  if(rawCity.indexOf('PD') > 0) {
    city = rawCity.substring(1, rawCity.indexOf('PD'));
  } else {
    city = rawCity.substring(1, rawCity.indexOf(','));
  }

  if(rawCity.indexOf('Metro') > 0) {
    city = city.substring(0, city.indexOf('Metro'));
  }
  return city.trim();
}

function extractState(rawState) {
  var state = rawState.substring(rawState.indexOf(', ')+2);
  state = state.substring(0, state.indexOf('\"'));
  return state.trim();
}

function extractLoc(rawLoc) {
  var loc = [];
  loc[0] = rawLoc.substring(1, rawLoc.indexOf(','))*1;
  loc[1] = rawLoc.substring(rawLoc.indexOf(',')+2);
  loc[1] = loc[1].substring(0, loc[1].indexOf('\"'))*1;
  return loc;
}

function readCrimes() {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.resolve(__dirname, './crime.txt'), 'utf8', function(err, data) {
      if(err) { reject(err); }

      var row,
          crimeData,
          crime,
          index;

      data = data.split('\r').splice(1);

      // process each row of the dataset
      for(var r in data) {
        row = data[r].split('\t');
        crimeData = {};

        crimeData.city = extractCity(row[0]);
        crimeData.state = extractState(row[0]);
        crimeData.loc = extractLoc(row[1]);

        // process each year for the given row
        for(var i = 0; i <= 30; i++) {
          index = 2 + (i*4);
          crime = {
            city: crimeData.city,
            state: crimeData.state,
            loc: crimeData.loc
          };
          crime.year = 1985 + i;
          crime.numMonths = 1*row[index];
          crime.totalPop = 1*row[index+1];
          crime.numHomicides = 1*row[index+2];
          crime.homicideRate = 1*row[index+3];
          output.push(crime);
        }
      }

      resolve();
    });
  });
}



// export a function with a callback to allow asynchronous reading
module.exports = function(cb) {
  readCrimes().then(function() {
    cb(null, output);
  }, function(err) {
    console.log('error!?');
    cb(err, []); // Error: "It broke"
  });
};
