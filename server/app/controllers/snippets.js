
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
var Snippet = mongoose.model('Snippet');

/**
 * Vars
 */
var blacklist = [ '__v' ]
  , projection = { __v: 0 };

module.exports = {
  findOne: function *(next) {
    this.snippet = yield Promise.promisify(Snippet.findOne, Snippet)({ slug: this.params.snippet });
    yield next;
    delete this.snippet;
  },

  /**
   * Index
   * GET /api/snippets
   */
  index: function *(next) {
    this.body = yield Promise.promisify(Snippet.find, Snippet)({}, projection);
  },

  /**
   * Show
   * GET /api/snippets/:snippet
   */
  show: function *(next) {
    if (!this.snippet) return yield next; // 404 Not Found
    this.body = yield cU.censor(this.snippet, blacklist);
  },

  /**
   * Create
   * POST /api/snippets
   */
  create: function *(next) {
    this.snippet = new Snippet(yield coBody(this));
    yield Promise.promisify(this.snippet.save, this.snippet)();
    this.status = 201; // 201 Created
    this.body = yield cU.created('snippet', this.snippet);
  },

  /**
   * Update
   * POST /api/snippets/:snippet
   */
  update: function *(next) {
    if (!this.snippet) return yield next; // 404 Not Found
    this.snippet = _.extend(this.snippet, yield coBody(this));
    yield Promise.promisify(this.snippet.save, this.snippet)();
    this.body = yield cU.updated('snippet', this.snippet);
  },

  /**
   * Destroy
   * DELETE /api/snippets/:snippet
   */
  destroy: function *(next) {
    if (!this.snippet) return yield next; // 404 Not Found
    yield Promise.promisify(this.snippet.remove, this.snippet)();
    this.body = yield cU.deleted('snippet', this.snippet);
  }
};
