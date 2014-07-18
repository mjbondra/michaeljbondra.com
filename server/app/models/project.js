
/**
 * Module dependencies
 */
var cU = require('../../assets/lib/common-utilities')
  , mongoose = require('mongoose')
  , msg = require('../../config/messages')
  , sanitize = require('../../assets/lib/sanitizer-extended')
  , Schema = mongoose.Schema
  , validate = require('../../assets/lib/validator-extended');

/**
 * Schema dependencies; subdocuments
 */
var ImageSchema = mongoose.model('Image').schema;

var ProjectSchema = new Schema({
  body: {
    type: String,
    validate: [
      { validator: validate.notNull, msg: msg.body.isNull }
    ]
  },
  github: String,
  images: [ ImageSchema ],
  slug: {
    type: String,
    index: { unique: true }
  },
  tags: [{
    slug: String,
    title: String
  }],
  title: {
    type: String,
    validate: [
      { validator: validate.notNull, msg: msg.title.isNull }
    ]
  },
  url: String
});

/**
 * Pre-validation hook; Sanitizers
 */
ProjectSchema.pre('validate', function (next) {
  this.body = sanitize.escape(this.body);
  this.github = sanitize.escape(this.github);
  this.title = sanitize.escape(this.title);
  this.url = sanitize.escape(this.url);
  var i = this.tags.length;
  while (i--) {
    if (!this.tags[i].title) this.tags.splice(i, 1);
    else this.tags[i].title = sanitize.escape(this.tags[i].title);
  }
  next();
});

/**
 * Pre-save hook
 */
ProjectSchema.pre('save', function (next) {
  this.slug = cU.slug(this.title);
  var i = this.tags.length;
  while (i--) this.tags[i].slug = cU.slug(this.tags[i].title);
  next();
});

mongoose.model('Project', ProjectSchema);
