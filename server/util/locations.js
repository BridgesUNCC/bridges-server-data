'use strict';

(function() {
  /*
    Average lat long coordinates for US states
      From https://gist.github.com/meiqimichelle/7727723
  */
  var states = {
        'Alaska' : { 'avgPos' : [61.385,-152.2683]},
        'Alabama' : { 'avgPos' : [32.799,-86.8073]},
        'Arkansas' : { 'avgPos' : [34.9513,-92.3809]},
        'Arizona' : { 'avgPos' : [33.7712,-111.3877]},
        'California' : { 'avgPos' : [36.17,-119.7462]},
        'Colorado' : { 'avgPos' : [39.0646,-105.3272]},
        'Connecticut' : { 'avgPos' : [41.5834,-72.7622]},
        'Delaware' : { 'avgPos' : [39.3498,-75.5148]},
        'Florida' : { 'avgPos' : [27.8333,-81.717]},
        'Georgia' : { 'avgPos' : [32.9866,-83.6487]},
        'Hawaii' : { 'avgPos' : [21.1098,-157.5311]},
        'Iowa' : { 'avgPos' : [42.0046,-93.214]},
        'Idaho' : { 'avgPos' : [44.2394,-114.5103]},
        'Illinois' : { 'avgPos' : [40.3363,-89.0022]},
        'Indiana' : { 'avgPos' : [39.8647,-86.2604]},
        'Kansas' : { 'avgPos' : [38.5111,-96.8005]},
        'Kentucky' : { 'avgPos' : [37.669,-84.6514]},
        'Louisiana' : { 'avgPos' : [31.1801,-91.8749]},
        'Massachusetts' : { 'avgPos' : [42.2373,-71.5314]},
        'Maryland' : { 'avgPos' : [39.0724,-76.7902]},
        'Maine' : { 'avgPos' : [44.6074,-69.3977]},
        'Michigan' : { 'avgPos' : [43.3504,-84.5603]},
        'Minnesota' : { 'avgPos' : [45.7326,-93.9196]},
        'Missouri' : { 'avgPos' : [38.4623,-92.302]},
        'Mississippi' : { 'avgPos' : [32.7673,-89.6812]},
        'Montana' : { 'avgPos' : [46.9048,-110.3261]},
        'North Carolina' : { 'avgPos' : [35.6411,-79.8431]},
        'North Dakota' : { 'avgPos' : [47.5362,-99.793]},
        'Nebraska' : { 'avgPos' : [41.1289,-98.2883]},
        'New Hampshire' : { 'avgPos' : [43.4108,-71.5653]},
        'New Jersey' : { 'avgPos' : [40.314,-74.5089]},
        'New Mexico' : { 'avgPos' : [34.8375,-106.2371]},
        'Nevada' : { 'avgPos' : [38.4199,-117.1219]},
        'New York' : { 'avgPos' : [42.1497,-74.9384]},
        'Ohio' : { 'avgPos' : [40.3736,-82.7755]},
        'Oklahoma' : { 'avgPos' : [35.5376,-96.9247]},
        'Oregon' : { 'avgPos' : [44.5672,-122.1269]},
        'Pennsylvania' : { 'avgPos' : [40.5773,-77.264]},
        'Rhode Island' : { 'avgPos' : [41.6772,-71.5101]},
        'South Carolina' : { 'avgPos' : [33.8191,-80.9066]},
        'South Dakota' : { 'avgPos' : [44.2853,-99.4632]},
        'Tennessee' : { 'avgPos' : [35.7449,-86.7489]},
        'Texas' : { 'avgPos' : [31.106,-97.6475]},
        'Utah' : { 'avgPos' : [40.1135,-111.8535]},
        'Virginia' : { 'avgPos' : [37.768,-78.2057]},
        'Vermont' : { 'avgPos' : [44.0407,-72.7093]},
        'Washington' : { 'avgPos' : [47.3917,-121.5708]},
        'Wisconsin' : { 'avgPos' : [44.2563,-89.6385]},
        'West Virginia' : { 'avgPos' : [38.468,-80.9696]},
        'Wyoming' : { 'avgPos' : [42.7475,-107.2085]},
      };

  /*
    Given a location name, return its associated coordinates or return null.
  */
  var lookFor = function(name) {
        return states.hasOwnProperty(name) ? states[name] : null;
  };

  for(var s in states) {
    console.log(states[s].avgPos + ",");
  }

  module.exports = {
    lookup: lookFor
  };
})();
