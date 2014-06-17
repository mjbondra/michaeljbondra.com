
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
var blacklist = [ '_id', '__v' ]
  , projection = { _id: 0, __v: 0, 'images._id': 0, 'images.__v': 0 };

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
      if (!this.project) return yield next; // 404 Not Found
      var image = new Image()
        , imageLrg = new Image()
        , imageMed = new Image()
        , imageSm = new Image()
        , imageExSm = new Image();

      // stream image from form data
      yield image.stream(this, { alt: this.project.title, crop: true, type: 'projects' }); // 400px height / 400px width
      yield [ // resize multiple images asynchronously; yield until all are complete
        imageLrg.resize(image), // 50% height / 50% width
        imageMed.resize(image, { geometry: { height: 25, width: 25 }}), // 25% height / 25% width
        imageSm.resize(image, { geometry: { height: 50, width: 50 }, percentage: false }), // 50px height / 50px width
        imageExSm.resize(image, { geometry: { height: 25, width: 25 }, percentage: false }) // 25px height / 25px width
      ];

      // remove old images
      if (this.project.images.length > 0) {
        var i = this.project.images.length;
        while (i--) yield this.project.images[i].destroy();
      }
      this.project.images = [ image, imageLrg, imageMed, imageSm, imageExSm ]; // limit project images to a single (current) image

      yield Promise.promisify(this.project.save, this.project)();
      this.status = 201;
      this.body = yield cU.censor(this.project, blacklist);
    },

    /**
     * Destroy
     * DELETE /api/projects/:project/images
     */
    destroy: function *(next) {
      if (!this.project) return yield next; // 404 Not Found

      // remove images
      if (this.project.images.length > 0) {
        var i = this.project.images.length;
        while (i--) yield this.project.images[i].destroy();
      }
      this.project.images = [];
      yield Promise.promisify(this.project.save, this.project)();
      this.body = yield cU.censor(this.project, blacklist);
    }
  }
};
