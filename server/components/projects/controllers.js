var mongoose = require('mongoose')
  , Bluebird = require('bluebird');

var Project = mongoose.model('Project');

exports.index = function *() {
  this.body = yield Bluebird.promisify(Project.find, Project)({}, {
    color: 1,
    'image.thumbnail': 1,
    slug: 1,
    title: 1
  });
};

exports.show = function *(next) {
  var project = yield Bluebird.promisify(Project.findOne, Project)({
    slug: this.params.project
  });
  if (!project) return yield next;
  this.body = project;
};
