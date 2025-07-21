'use strict';

var WorldCountryModel = require('./world_map.model')
var WorldCountry = WorldCountryModel.model;


function handleError(res, err) {
  return res.status(500).send(err);
}


// Get list of countries
// No filtering
exports.index = async function(req, res) {
    WorldCountry.find({}, {"_id":0, "__v":0} )
	.exec(function (err, countries) {
	    if(err) { return handleError(res, err); }
	    console.log("Got Coutries")
	    // return the structure of the model and the data
	    return res.status(200).json({
		'data': countries
	    });
	});
};


