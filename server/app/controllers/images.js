
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
var Image = mongoose.model('Image');

module.exports = {
  findOne: function *(next) {
    this.image = yield Promise.promisify(Image.findOne, Project)({ id: this.params.image });
    yield next;
    delete this.image;
  },

  show: function *(next) {
    yield next;
  },
  create: function *(next) {
    if (!this.images) return yield next; // 404 Not Found
    var images = []
      , raw = new Image()
      , sizes = this.images.sizes || []
      , i = sizes.length;
    yield raw.stream(this, { alt: this.images.alt, type: this.images.type });
    while (i--) images.push(new Image().resizePromise(raw, sizes[i]));
    this.images = [].concat(raw, yield images);
  },
  update: function *(next) {
    yield next;
  },
  destroy: function *(next) {

    yield next;
  }
};
