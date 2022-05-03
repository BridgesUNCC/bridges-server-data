'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/us_cities', function() {

  it('should respond with JSON object, and contain an object and an Array', function(done) {
    request(app)
      .get('/api/us_cities')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) { return done(err); }
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        res.body.data.length.should.be.equal(10000);
        done();
      });
  });
});

describe('GET /api/us_cities?limit=10', function() {

  it('should respond with JSON object, and contain an object and an Array of 10 objects', function(done) {
    request(app)
      .get('/api/us_cities?limit=10')
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

describe('GET /api/us_cities?limit=something', function() {

  it('should respond with JSON object, and contain an object and an Array of 1000 objects', function(done) {
    request(app)
      .get('/api/us_cities?limit=something')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        res.body.data.length.should.be.equal(10000);
        done();
      });
  });
});

describe('GET /api/us_cities?limit=-1', function() {

  it('should respond with JSON object, and contain an object and an Array of 1000 objects', function(done) {
    request(app)
      .get('/api/us_cities?limit=-1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        res.body.data.length.should.be.equal(10000);
        done();
      });
  });
});

describe('GET /api/us_cities?state=NC', function() {

  it('should respond with JSON object, and contain an object and an Array of NC states', function(done) {
    request(app)
      .get('/api/us_cities?state=NC')
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
