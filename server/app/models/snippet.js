
/**
 * Module dependencies
 */
var cU = require('../../assets/lib/common-utilities')
  , mongoose = require('mongoose')
  , msg = require('../../config/messages')
  , sanitize = require('../../assets/lib/sanitizer-extended')
  , Schema = mongoose.Schema
  , validate = require('../../assets/lib/validator-extended');

var SnippetSchema = new Schema({
  body: {
    type: String,
    validate: [
      { validator: validate.notNull, msg: msg.body.isNull }
    ]
  },
  slug: {
    type: String,
    index: { unique: true }
  },
  title: {
    type: String,
    validate: [
      { validator: validate.notNull, msg: msg.title.isNull }
    ]
  }
});

/**
 * Pre-validation hook; Sanitizers
 */
SnippetSchema.pre('validate', function (next) {
  this.body = sanitize.sanitize(this.body);
  this.title = sanitize.escape(this.title);
  next();
});

/**
 * Pre-save hook
 */
SnippetSchema.pre('save', function (next) {
  this.slug = cU.slug(this.title);
  next();
});

mongoose.model('Snippet', SnippetSchema);
