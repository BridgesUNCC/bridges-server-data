'use strict';

var dat = require('./cancer.json');
var loc = require('./../../util/locations.js');
var fs = require('fs');

for(var d in dat) {
  dat[d].loc = loc.lookup(dat[d].Area);
  if(dat[d].loc != null) dat[d].loc = dat[d].loc.avgPos;
}

fs.writeFile('test.txt', JSON.stringify(dat), function(err) {
    if(err) {
        return console.log(err);
    }
});
