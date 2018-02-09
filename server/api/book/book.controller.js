/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /books              ->  index
 */

'use strict';

var BookModel = require('./book.model');
var Book = BookModel.model;
var structure = BookModel.structure;

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of book data
exports.index = function(req, res) {
  var limit = (req.query.limit &&
                +req.query.limit > 0 &&
                +req.query.limit <= 1000) ?
        req.query.limit // use valid limit
        : 1000;        // use actual number

  // Query for <limit> book
  Book.find({},{
    '_id': 0,
    'author': 1,
    'title': 1,
    'languages': 1,
    'genres': 1,
    'subjects': 1,
    'metrics': 1,
    'url': 1,
    'downloads': 1
  })
  .limit(limit)
  .lean().exec(function (err, books) {
    if(err) { return handleError(res, err); }

    // return the structure of the model and the book data
    return res.status(200).json({
      'structure': structure,
      'data': books
    });
  });
};

exports.findOne = function(req, res) {
  Book.count().exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count);

    Book.findOne({},{
      '_id': 0,
      'author': 1,
      'title': 1,
      'languages': 1,
      'genres': 1,
      'subjects': 1,
      'metrics': 1,
      'url': 1,
      'downloads': 1
    })
    .skip(random)
    .exec(function(err, book) {
      if(err) { return handleError(res, err); }

      // return the book data
      return res.status(200).json(book);
    });
  });
};
