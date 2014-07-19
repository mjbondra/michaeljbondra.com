
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
var Description = mongoose.model('Description');

/**
 * Vars
 */
var blacklist = [ '__v' ]
  , projection = { __v: 0 };

module.exports = {
  findOne: function *(next) {
    this.description = yield Promise.promisify(Description.findOne, Description)({ slug: this.params.description });
    yield next;
    delete this.description;
  },

  /**
   * Index
   * GET /api/descriptions
   */
  index: function *(next) {
    this.body = yield Promise.promisify(Description.find, Description)({}, projection);
  },

  /**
   * Show
   * GET /api/descriptions/:description
   */
  show: function *(next) {
    if (!this.description) return yield next; // 404 Not Found
    this.body = yield cU.censor(this.description, blacklist);
  },

  /**
   * Create
   * POST /api/descriptions
   */
  create: function *(next) {
    this.description = new Description(yield coBody(this));
    yield Promise.promisify(this.description.save, this.description)();
    this.status = 201; // 201 Created
    this.body = yield cU.created('description', this.description);
  },

  /**
   * Update
   * POST /api/descriptions/:description
   */
  update: function *(next) {
    if (!this.description) return yield next; // 404 Not Found
    this.description = _.extend(this.description, yield coBody(this));
    yield Promise.promisify(this.description.save, this.description)();
    this.body = yield cU.updated('description', this.description);
  },

  /**
   * Destroy
   * DELETE /api/descriptions/:description
   */
  destroy: function *(next) {
    if (!this.description) return yield next; // 404 Not Found
    yield Promise.promisify(this.description.remove, this.description)();
    this.body = yield cU.deleted('description', this.description);
  }
};
