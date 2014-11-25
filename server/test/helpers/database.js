var Bluebird = require('bluebird')
  , co = require('co')
  , mongoose = require('mongoose')
  , Project = mongoose.model('Project')
  , Message = mongoose.model('Message');

exports.removeCollections = function (done) {
  co(function *() {
    yield [
      Bluebird.promisify(Project.collection.remove, Project.collection)(),
      Bluebird.promisify(Message.collection.remove, Message.collection)()
    ];
  }).then(function () {
    done();
  });
};
