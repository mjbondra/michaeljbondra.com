
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
  body: String,
  github: String,
  images: [ ImageSchema ],
  slug: String,
  tags: [{
    slug: String,
    title: String
  }],
  title: String,
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
  next();
});

/**
 * Pre-save hook
 */
ProjectSchema.pre('save', function (next) {
  this.slug = cU.slug(this.title);
  next();
});

mongoose.model('Project', ProjectSchema);
