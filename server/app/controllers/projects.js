var mongoose = require('mongoose')
  , Bluebird = require('bluebird');

var Project = mongoose.model('Project');

exports.index = function *(next) {
  this.body = yield Bluebird.promisify(Project.find, Project)();
};
