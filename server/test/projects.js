var app = require('../')
  , database = require('./helpers/database')
  , mongoose = require('mongoose')
  , supertest = require('supertest');

var agent = supertest.agent(app.listen());

var Project = mongoose.model('Project');

describe('Projects', function () {
  before(function (done) {
    var project = new Project({
      title: 'Foo Bar',
      body: 'Foo bar, foo baz.'
    });
    project.save(done);
  });

  describe('GET /api/projects', function () {
    it('should return JSON and a 200', function (done) {
      agent
      .get('/api/projects')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });

  describe('GET /api/projects/:project', function () {
    describe('Invalid project URI', function () {
      it('should return JSON and a 404', function (done) {
        agent
        .get('/api/projects/foo-baz')
        .expect('Content-Type', /json/)
        .expect(404, done);
      });
    });

    describe('Valid project URI', function () {
      it('should return JSON and a 200', function (done) {
        agent
        .get('/api/projects/foo-bar')
        .expect('Content-Type', /json/)
        .expect(200, done);
      });
    });
  });

  after(function (done) {
    database.removeCollections(done);
  });
});
