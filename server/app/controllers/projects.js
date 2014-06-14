
/**
 * Module dependencies.
 */
var coBody = require('co-body')
  , cU = require('../../assets/lib/common-utilities')
  , mongoose = require('mongoose')
  , msg = require('../../config/messages')
  , Promise = require('bluebird')
  , _ = require('underscore');

/**
 * Models
 */
var Image = mongoose.model('Image')
  , Project = mongoose.model('Project');

/**
 * Censor blacklist and Mongo projection paramater; includes or excludes fields
 */
var blacklist = ['id', '__v', 'path']
  , projection = { _id: 0, __v: 0, 'images._id': 0, 'images.__v': 0, 'images.path': 0 };

module.exports = {
  findOne: function *(next) {
    this.project = yield Promise.promisify(Project.findOne, Project)({ slug: this.params.project });
    yield next;
    delete this.project;
  },

  /**
   * Index
   * GET /api/projects
   */
  index: function *(next) {
    this.body = yield Promise.promisify(Project.find, Project)({}, projection);
  },

  /**
   * Show
   * GET /api/projects/:project
   */
  show: function *(next) {
    if (!this.project) return yield next; // 404 Not Found
    this.body = yield cU.censor(this.project, blacklist);
  },

  /**
   * Create
   * POST /api/projects/new
   */
  create: function *(next) {
    this.project = new Project(yield coBody(this));
    yield Promise.promisify(this.project.save, this.project)();
    this.status = 201; // 201 Created
    this.body = yield cU.created('project', this.project);
  },

  /**
   * Update
   * POST /api/projects/:project
   */
  update: function *(next) {
    if (!this.project) return yield next; // 404 Not Found
    this.project = _.extend(this.project, _.omit(yield coBody(this), 'images'));
    yield Promise.promisify(this.project.save, this.project)();
    this.body = yield cU.updated('project', this.project);
  },

  /**
   * Destroy
   * DELETE /api/projects/:project
   */
  destroy: function *(next) {
    if (!this.project) return yield next; // 404 Not Found
    yield Promise.promisify(this.project.remove, this.project)();
    this.body = yield cU.deleted('project', this.project);
  },

  images: {

    /**
     * Create
     * POST /api/projects/:project/images
     */
    create: function *(next) {
      yield next;
    },

    /**
     * Destroy
     * DELETE /api/projects/:project/images
     */
    destroy: function *(next) {
      yield next;
    }
  }
};
