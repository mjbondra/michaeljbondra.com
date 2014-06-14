
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

mongoose.model('Project', ProjectSchema);
