
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
var User = mongoose.model('User');

/**
 * Vars
 */
var blacklist = [ '__v' ]
  , projection = { __v: 0 };

module.exports = {
  findOne: function *(next) {
    this.user = yield Promise.promisify(User.findOne, User)({ slug: this.params.user });
    yield next;
    delete this.user;
  },

  /**
   * Index
   * GET /api/users
   */
  index: function *(next) {
    this.body = yield Promise.promisify(User.find, User)({}, projection);
  },

  /**
   * Show
   * GET /api/users/:user
   */
  show: function *(next) {
    if (!this.user) return yield next; // 404 Not Found
    this.body = yield cU.censor(this.user, blacklist);
  },

  /**
   * Create
   * POST /api/users
   */
  create: function *(next) {
    this.user = new User(_.omit(yield coBody(this), 'images'));
    yield Promise.promisify(this.user.save, this.user)();
    this.status = 201; // 201 Created
    this.body = yield cU.created('user', this.user);
  },

  /**
   * Update
   * POST /api/users/:user
   */
  update: function *(next) {
    if (!this.user) return yield next; // 404 Not Found
    this.user = _.extend(this.user, yield cU.censor(yield coBody(this), ['encoding', 'files', 'mimetype', 'type']));
    yield Promise.promisify(this.user.save, this.user)();
    this.body = yield cU.updated('user', this.user);
  },

  /**
   * Destroy
   * DELETE /api/users/:user
   */
  destroy: function *(next) {
    if (!this.user) return yield next; // 404 Not Found
    yield Promise.promisify(this.user.remove, this.user)();
    this.body = yield cU.deleted('user', this.user);
  },

  images: {
    create: function *(next) {
      yield next;
    },
    update: function *(next) {
      yield next;
    },
    destroy: function *(next) {
      yield next;
    }
  },
  sessions: {
    show: function *(next) {
      yield next;
    },
    create: function *(next) {
      yield next;
    },
    update: function *(next) {
      yield next;
    },
    destroy: function *(next) {
      yield next;
    }
  }
};
