var mongoose = require('mongoose')
  , Promise = require('bluebird');

var Project = mongoose.model('Project');

exports.index = function *(next) {
  this.body = yield Promise.promisify(Project.find, Project)({});
}
