'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/songs', function() {

  it('should respond with JSON object, and contain an object and an Array', function(done) {
    request(app)
      .get('/api/songs')
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

describe('GET /api/songs?limit=5', function() {

  it('should respond with JSON object, and contain an object and an Array of 5 objects', function(done) {
    request(app)
      .get('/api/songs?limit=5')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        res.body.data.length.should.be.equal(5);
        done();
      });
  });
});

describe('GET /api/songs?limit=something', function() {

  it('should respond with JSON object, and contain an object and an Array of 5 objects', function(done) {
    request(app)
      .get('/api/songs?limit=something')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        res.body.data.length.should.be.equal(5);
        done();
      });
  });
});

describe('GET /api/songs?limit=-1', function() {

  it('should respond with JSON object, and contain an object and an Array of 5 objects', function(done) {
    request(app)
      .get('/api/songs?limit=-1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.structure.should.be.instanceOf(Object);
        res.body.data.should.be.instanceOf(Array);
        res.body.data.length.should.be.equal(5);
        done();
      });
  });
});
