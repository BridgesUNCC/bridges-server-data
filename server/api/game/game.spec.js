'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/games', function() {

  it('should respond with JSON object, and contain an object and an Array', function(done) {
    request(app)
      .get('/api/games')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        done();
      });
  });
});

describe('GET /api/games?limit=10', function() {

  it('should respond with JSON object, and contain an object and an Array of 10 objects', function(done) {
    request(app)
      .get('/api/games?limit=10')
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

describe('GET /api/games?limit=something', function() {

  it('should respond with JSON object, and contain an object and an Array of 17534 objects', function(done) {
    request(app)
      .get('/api/games?limit=something')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        res.body.data.length.should.be.equal(17534);
        done();
      });
  });
});

describe('GET /api/games?limit=-1', function() {

  it('should respond with JSON object, and contain an object and an Array of 17534 objects', function(done) {
    request(app)
      .get('/api/games?limit=-1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        res.body.data.length.should.be.equal(17534);
        done();
      });
  });
});
