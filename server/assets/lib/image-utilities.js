
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

/**
 * Models
 */
var Image = mongoose.model('Image');

/**
 * Helper function for uploading and resizing images
 */
var uploadAndResize = function *(ctx, images, opts) {
  var _images = []
    , raw = new Image()
    , sizes = opts.sizes || []
    , i = sizes.length;
  yield raw.stream(ctx, { alt: opts.alt, type: opts.type });
  while (i--) _images.push(new Image().resize(raw, sizes[i]));
  return [].concat(raw, yield _images);
};

module.exports = {

  /**
   * Create images
   */
  create: function *(ctx, images, opts) {
    images = images || [];
    opts = opts || {};
    if (!ctx) return images;
    var _images = yield uploadAndResize(ctx, images, opts)
      , multiple = opts.multiple || false;
    if (multiple) return images.concat(_images);
    var i = images.length;
    while (i--) yield images[i].destroy(); // remove existing images from file system
    return _images;
  },

  /**
   * Update images
   */
  update: function *(ctx, images, id, opts) {
    images = images || [];
    opts = opts || {};
    if (!ctx || !id) return images;
    var _images = yield uploadAndResize(ctx, images, opts)
      , multiple = opts.multiple || false;
    var i = images.length;
    while (i--) if (!multiple || (images[i].id === id || String(images[i].related) === id)) {
      yield images[i].destroy(); // remove previous image(s) from file system
      images.splice(i, 1);
    }
    return images.concat(_images);
  },

  /**
   * Destroy images
   */
  destroy: function *(images, id) {
    if (!id) return images;
    images = images || [];
    var i = images.length;
    while (i--) if (images[i].id === id || String(images[i].related) === id) {
      yield images[i].destroy();
      images.splice(i, 1);
    }
    return images;
  }
};
