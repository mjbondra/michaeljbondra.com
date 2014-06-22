
/**
 * Module dependencies.
 */
var coBody = require('co-body')
  , cU = require('../../assets/lib/common-utilities')
  , mongoose = require('mongoose')
  , images = require('../../assets/lib/image-utilities')
  , msg = require('../../config/messages')
  , Promise = require('bluebird')
  , _ = require('underscore');

/**
 * Models
 */
var Project = mongoose.model('Project');

/**
 * Vars
 */
var blacklist = [ '__v' ]
  , imageOptions = {
      multiple: true,
      sizes: [ // image sizes
        { geometry: { height: 200, width: 200 }},
        { geometry: { height: 100, width: 100 }},
        { geometry: { height: 50, width: 50 }},
        { geometry: { height: 25, width: 25 }}
      ],
      type: 'projects'
    }
  , projection = { __v: 0, 'images.__v': 0 };

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
   * POST /api/projects
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
    this.project = _.extend(this.project, yield coBody(this));
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
      if (!this.project) return yield next; // 404 Not Found
      this.project.images = yield images.create(this, this.project.images, imageOptions);
      yield Promise.promisify(this.project.save, this.project)();
      this.status = 201;
      this.body = yield cU.censor(this.project.images, blacklist);
    },

    /**
     * Update
     * PUT /api/projects/:project/images/:image
     */
    update: function *(next) {
      if (!this.project) return yield next; // 404 Not Found
      this.project.images = yield images.update(this, this.project.images, this.params.image, imageOptions);
      yield Promise.promisify(this.project.save, this.project)();
      this.body = yield cU.censor(this.project.images, blacklist);
    },

    /**
     * Destroy
     * DELETE /api/projects/:project/images/:image
     */
    destroy: function *(next) {
      if (!this.project) return yield next; // 404 Not Found
      this.project.images = yield images.destroy(this.project.images, this.params.image);
      yield Promise.promisify(this.project.save, this.project)();
      this.body = yield cU.censor(this.project.images, blacklist);
    }
  }
};
