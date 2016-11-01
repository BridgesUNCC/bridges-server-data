'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/books', function() {

  it('should respond with JSON object, and contain an object and an Array', function(done) {
    request(app)
      .get('/api/books')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) { return done(err); }
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        done();
      });
  });
});

describe('GET /api/books?limit=10', function() {

  it('should respond with JSON object, and contain an object and an Array of 10 objects', function(done) {
    request(app)
      .get('/api/books?limit=10')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        res.body.data.length.should.be.equal(10);
        done();
      });
  });
});

describe('GET /api/books?limit=something', function() {

  it('should respond with JSON object, and contain an object and an Array of 1000 objects', function(done) {
    request(app)
      .get('/api/books?limit=something')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        res.body.data.length.should.be.equal(1000);
        done();
      });
  });
});

describe('GET /api/books?limit=-1', function() {

  it('should respond with JSON object, and contain an object and an Array of 1000 objects', function(done) {
    request(app)
      .get('/api/books?limit=-1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        res.body.data.length.should.be.equal(1000);
        done();
      });
  });
});
