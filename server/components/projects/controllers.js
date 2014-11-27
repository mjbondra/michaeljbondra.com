var mongoose = require('mongoose')
  , Bluebird = require('bluebird');

var Project = mongoose.model('Project');

exports.index = function *() {
  this.body = yield Bluebird.promisify(Project.find, Project)();
};

exports.show = function *(next) {
  var project = yield Bluebird.promisify(Project.findOne, Project)({
    slug: this.params.project
  });
  if (!project) return yield next;
  this.body = project;
};
