'use strict';

var data = require('./classics.json');
var output = [];

// Trim out unique genres from the subjects attributes
function parseGenre(subjects) {
  var trim, genre, genres = [];
  for(var s in subjects) {
    trim = subjects[s].toLowerCase();
    trim = trim.substring(trim.lastIndexOf('--'));
    genre = (trim.indexOf('--') >= 0) ? trim.slice(3) : trim;
    genre = genre.trim();
    if(genres.indexOf(genre) === -1) {
      genres.push(genre);
    }
  }
  return genres;
}

// Trim out unique subjects from the subjects attributes
function parseSubjects(subjects) {
  var trim, allSubjects = [];
  for(var s in subjects) {
    trim = subjects[s].toLowerCase();
    if(trim.indexOf('--') >= 0) {
      trim = trim.substring(0, trim.indexOf('--'));
    }
    trim = trim.trim();
    if(allSubjects.indexOf(trim) === -1) {
      allSubjects.push(trim);
    }
  }
  return allSubjects;
}

// main loop over all books
for( var i in data ) {
  var b = data[i],  // original JSON data
  book = {};        // new book object

  // save relevant attributes
  book.author = {};
    book.author.name = b.bibliography.author.name;
    book.author.birth = b.bibliography.author.birth;
    book.author.death = b.bibliography.author.death;
  book.title = b.bibliography.title.replace(new RegExp('\"', 'g'), '\'');
  book.languages = b.bibliography.languages;
  book.genres = parseGenre(b.bibliography.subjects);
  book.subjects = parseSubjects(b.bibliography.subjects);
  book.metrics = {};
    book.metrics.characters = b.metrics.statistics.characters;
    book.metrics.words = b.metrics.statistics.words;
    book.metrics.sentences = b.metrics.statistics.sentences;
    book.metrics.difficultWords = b.metrics.difficulty['difficult words'];
  book.url = b.metadata.url;
  book.downloads = b.metadata.downloads;

  // store all objects in main output array
  output.push(book);
}

module.exports = output;
