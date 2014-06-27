
/**
 * Module dependencies.
 */
var cU = require('./common-utilities')
  , mongoose = require('mongoose');

/**
 * Models
 */
var Image = mongoose.model('Image');

/**
 * Helper function for uploading and resizing images
 *
 * @param   {object}  ctx    -  koa context object
 * @param   {object}  image  -  image object
 * @param   {object}  opts   -  options object
 * @return  {object}         -  image object
 */
var uploadAndResize = function *(ctx, image, opts) {
  var files = []
    , raw = yield image.stream(ctx, { alt: opts.alt, type: opts.type })
    , sizes = opts.sizes || []
    , i = sizes.length;
  while (i--) files.push(image.resize(raw, sizes[i]));
  yield files;
  return image;
};

module.exports = {

  /**
   * Find an image within an array of images, and return its index
   *
   * @param   {array}   images  -  array of image objects
   * @param   {string}  id      -  image id
   * @return  {number}          -  index of image in image array, or -1 if not found
   */
  indexOf: function (images, id) {
    var index = -1
      , i = images.length;
    while (i--) if (images[i].id === id) return i;
    return index;
  },

  /**
   * Create images
   *
   * @param   {object}  ctx     -  koa context object
   * @param   {array}   images  -  array of image objects
   * @param   {object}  opts    -  options object
   * @return  {array}           -  array of image objects
   */
  create: function *(ctx, images, opts) {
    var image = yield uploadAndResize(ctx, new Image(), opts);
    images.push(image);
    ctx.status = 201;
    ctx.body = yield cU.created('image', image, image.alt, opts.blacklist);
    return images;
  },

  /**
   * Update images
   *
   * @param   {object}    ctx     -  koa context object
   * @param   {array}     images  -  array of image objects
   * @param   {string}    id      -  image id
   * @param   {object}    opts    -  options object
   * @param   {function}  next    -  404 middleware
   * @return  {array}             -  array of image objects
   */
  update: function *(ctx, images, id, opts) {
    var i = this.indexOf(images, id);
    if (i === -1) return images;
    var image = yield uploadAndResize(ctx, yield images[i].unlink(), opts);
    images.splice(i, 1, image);
    ctx.body = yield cU.updated('image', image, image.alt, opts.blacklist);
    return images;
  },

  /**
   * Destroy images
   *
   * @param   {object}    ctx     -  koa context object
   * @param   {array}     images  -  array of image objects
   * @param   {string}    id      -  image id
   * @param   {object}    opts    -  options object
   * @param   {function}  next    -  404 middleware
   * @return  {array}             -  array of image objects
   */
  destroy: function *(ctx, images, id, opts) {
    var i = this.indexOf(images, id);
    if (i === -1) return images;
    var image = yield images[i].unlink();
    images.splice(i, 1);
    ctx.body = yield cU.deleted('image', image, image.alt, opts.blacklist);
    return images;
  }
};
