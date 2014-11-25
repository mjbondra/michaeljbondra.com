var app = require('../')
  , database = require('./helpers/database')
  , supertest = require('supertest');

var agent = supertest.agent(app.listen());

describe('Messages', function () {
  describe('POST /api/messages', function () {
    describe('Valid parameters', function () {
      it('should return JSON and a 201', function (done) {
        agent
          .post('/api/messages')
          .send({
            body: 'Foo bar.',
            email: 'foobar@example.com'
          })
          .expect('Content-Type', /json/)
          .expect(201, done);
      });
    });
  });

  after(function (done) {
    database.removeCollections(done);
  });
});
