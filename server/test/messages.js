var app = require('../')
  , database = require('./helpers/database')
  , supertest = require('supertest');

var agent = supertest.agent(app.listen());

describe('Messages', function () {
  describe('POST /api/messages', function () {
    describe('Invalid parameters', function () {
      describe('Missing body field', function () {
        it('should return JSON and a 422', function (done) {
          agent
          .post('/api/messages')
          .send({
            email: 'foobar@example.com',
            name: 'Foo Baz'
          })
          .expect('Content-Type', /json/)
          .expect(422, done);
        });
      });

      describe('Invalid email address', function () {
        it('should return JSON and a 422', function (done) {
          agent
          .post('/api/messages')
          .send({
            body: 'Foo bar, foo baz.',
            email: 'foobar',
            name: 'Foo Baz'
          })
          .expect('Content-Type', /json/)
          .expect(422, done);
        });
      });
    });

    describe('Valid parameters', function () {
      it('should return JSON and a 201', function (done) {
        agent
          .post('/api/messages')
          .send({
            body: 'Foo bar, foo baz.',
            email: 'foobar@example.com',
            name: 'Foo Baz'
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
