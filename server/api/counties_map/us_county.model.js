'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// var structure = {
//   'id': 'String',
//   'city': 'String',
//   'state': 'String',
//   'country': 'String',
//   'lat': 'Number',
//   'lon': 'Number',
//   'elevation': 'Number',
//   'population': 'Number',
//   'timezone': 'String'
// };

// Define a schema for the geometry object
// const GeometrySchema = new mongoose.Schema({
//   type: { type: String, enum: ["Polygon", "MultiPolygon"]},
//   coordinates: { type: mongoose.Schema.Types.Mixed, required: true }
// }, { _id: false });

// // Define a schema for the feature object
// const FeatureSchema = new mongoose.Schema({
//   type: { type: String, default: "Feature" },
//   geometry: { type: GeometrySchema, required: true },
//   properties:{GEOID: String, FIPS_CODE: String, COUNTY_STATE_CODE: String, COUNTY_STATE_NAME: String}
// }, { _id: false });

// var USCountySchema = new Schema({
//   type: String,
//   features: {type: [FeatureSchema]}
// });


// Define the schema for the Feature object
const FeatureSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: 'Feature',
    required: true
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'],
      required: true
    },
    coordinates: {
      type: [mongoose.Schema.Types.Mixed],
      required: true
    }
  },
  properties: {
    GEOID: String,
    FIPS_CODE: String,
    COUNTY_STATE_CODE: String,
    COUNTY_STATE_NAME: String
    // Additional properties can be defined based on your specific data needs
  },
  id: Number
});

// Define the schema for the Feature Collection
// const FeatureCollectionSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['FeatureCollection'],
//     required: true
//   },
//   features: [FeatureSchema]
// });


module.exports = {'model': mongoose.model('USCounty', FeatureSchema)};
