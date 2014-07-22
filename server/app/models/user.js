
/**
 * Module dependencies
 */
var crypto = require('crypto')
  , cU = require('../../assets/lib/common-utilities')
  , mongoose = require('mongoose')
  , msg = require('../../config/messages')
  , sanitize = require('../../assets/lib/sanitizer-extended')
  , Schema = mongoose.Schema
  , uid = require('uid2')
  , validate = require('../../assets/lib/validator-extended');

/**
 * Schema dependencies; subdocuments
 */
var ImageSchema = mongoose.model('Image').schema;

/**
 * User schema
 */
var UserSchema = new Schema({
  email: {
    type: String,
    validate: [
      { validator: validate.isEmail, msg: msg.email.notEmail },
      { validator: validate.notNull, msg: msg.email.isNull }
    ]
  },
  hash: String,
  images: [ ImageSchema ],
  role: String,
  salt: String,
  slug: {
    type: String,
    index: { unique: true }
  },
  username: {
    type: String,
    validate: [
      { validator: validate.notNull, msg: msg.username.isNull }
    ]
  }
});

/**
 * Virtuals
 */
UserSchema.virtual('password')
  .set(function (password) {
    if (!password && !this.isNew) return;
    this._password = sanitize.escape(password);
    this.salt = this.makeSalt();
    this.hash = this.encrypt(this._password, this.salt);
  })
  .get(function () {
    return this._password;
  });

/**
 * Pre-validation hook; Sanitizers
 */
UserSchema.pre('validate', function (next) {
  // ensure that certain variables exists on new User objects for validation purposes
  if (!this.password && this.isNew) this.password = null;
  this.email = sanitize.escape(this.email);
  this.username = sanitize.escape(this.username);
  next();
});

/**
 * Validations
 */
UserSchema.path('hash').validate(function (v) {
  if (validate.isNull(this._password) && this.isNew) {
    this.invalidate('password', msg.password.isNull);
  }
}, null);

/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
  this.slug = cU.slug(this.username, true);
  next();
});

/**
 * Methods
 */
UserSchema.methods = {
  authenticate: function (plainText, salt) {
    return this.hash === this.encrypt(sanitize.escape(plainText), salt);
  },
  encrypt: function (plainText, salt) {
    var hash = crypto.createHmac('sha512', salt)
      .update(plainText)
      .digest('base64');
    return hash;
  },
  makeSalt: function () {
    return uid(15);
  }
};

mongoose.model('User', UserSchema);
