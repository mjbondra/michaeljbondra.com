var app = require('../')
  , database = require('./helpers/database')
  , supertest = require('supertest');

var agent = supertest.agent(app.listen());

describe('Projects', function () {
  describe('GET /api/projects', function () {
    it('should return JSON and a 200', function (done) {
      agent
      .get('/api/projects')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });

  after(function (done) {
    database.removeCollections(done);
  });
});
