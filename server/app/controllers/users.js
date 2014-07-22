
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

    /**
     * Deserialize/serialize user object in session
     * Make available to app as this.session.user
     */
    show: function () {
      return function *(next) {

        // if session ip is not set, set it
        if (!this.session.ip) this.session.ip = this.ip;

        // deserialize user object in session
        if (typeof this.session.user === 'string') {
          this.session.user = yield Promise.promisify(User.findById, User)(this.session.user).catch(function (err) {
            console.error(err.stack);
          });
        }
        yield next;

        // serialize user object in session
        if (this.session && this.session.user && this.session.user.username) {
          this.cookies.set('username', this.session.user.username, { httpOnly: false, overwrite: true, signed: true });
          this.session.user = this.session.user.id;
        } else {
          this.cookies.set('username', null, { httpOnly: false, overwrite: true, signed: true });
        }
      };
    },

    /**
     * Create
     * POST /api/sessions
     */
    create: function *(next) {
      var body = yield coBody(this);
      var msgJSONArray = [];
      if (typeof body.username === 'undefined') msgJSONArray.push(cU.msg(msg.username.isNull, 'validation', 'username'));
      if (typeof body.password === 'undefined') msgJSONArray.push(cU.msg(msg.password.isNull, 'validation', 'password'));
      if (msgJSONArray.length > 0) {
        this.status = 422; // 422 Unprocessable Entity
        this.body = yield cU.body(msgJSONArray);
        return;
      }
      var user = yield Promise.promisify(User.findOne, User)({ $or: [ { username: body.username }, { email: body.username } ] });
      if (!user) {
        this.status = 401; // 401 Unauthorized
        this.body = yield cU.body(cU.msg(msg.authentication.incorrect.user(body.username), 'authentication', 'user'));
        return;
      }
      if (!user.authenticate(body.password, user.salt)) {
        this.status = 401; // 401 Unauthorized
        this.body = yield cU.body(cU.msg(msg.authentication.incorrect.password, 'authentication', 'user'));
        return;
      }
      this.session.user = user;
      this.status = 201; // 201 Created
      this.body = yield cU.body(cU.msg(msg.authentication.success(user.username), 'success', 'user', cU.censor(user, ['_id', '__v', 'hash', 'salt']))); // 201 Created
    },

    /**
     * Destroy
     * DELETE /api/sessions
     */
    destroy: function *(next) {
      this.session = null;
      this.body = yield cU.body(cU.msg(cU.msg(msg.authentication.terminated)));
    }
  }
};
