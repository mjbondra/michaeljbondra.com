
/**
 * Module dependencies
 */
var co = require('co')
  , coBusboy = require('co-busboy')
  , coFs = require('co-fs')
  , config = require('../../config/config')[process.env.NODE_ENV || 'development']
  , cU = require('../../assets/lib/common-utilities')
  , fs = require('fs')
  , gm = require('gm')
  , mime = require('mime')
  , mongoose = require('mongoose')
  , msg = require('../../config/messages')
  , Promise = require('bluebird')
  , Schema = mongoose.Schema;

/**
 * Image validation error
 */
var ImageError = function (message, status, path) {
  this.name = 'ImageError';
  this.message = message || '';
  this.path = path || '';
  this.status = status || 400; // 400 Bad Request
};
ImageError.prototype = Error.prototype;

/**
 * Image schema
 */
var ImageSchema = new Schema({
  alt: String,
  encoding: String,
  filename: String,
  geometry: {
    height: Number,
    width: Number
  },
  mimetype: String,
  path: String,
  related: {
    type: Schema.ObjectId,
    ref: 'Image'
  },
  size: Number,
  src: String,
  type: String
});

/**
 * Image methods
 */
ImageSchema.methods = {

  /**
   * Deletes an image from the filesystem
   *
   * @param {object} Image - image object
   */
  destroy: function *() {
    if (this.path) {
      if (yield coFs.exists(this.path)) yield coFs.unlink(this.path);
    }
  },

  /**
   * Yieldable generator function for resizing an existing image and populating a new image object
   *
   * @param   {object}  image                      -  image object
   * @param   {object}  [opts]                     -  image options
   * @param   {boolean} [opts.crop=true]           -  create an image that crops to exact dimensions
   * @param   {object}  [opts.geometry]            -  image geometry
   * @param   {number}  [opts.geometry.height=50]  -  image height
   * @param   {number}  [opts.geometry.width=50]   -  image width
   */
  resize: function *(image, opts) {
    opts = opts || {};
    opts.crop = opts.crop === false ? false : true;
    opts.geometry = opts.geometry || {};
    opts.geometry.height = opts.geometry.height || 50;
    opts.geometry.width = opts.geometry.width || 50;

    var dir = config.path.upload + ( image.type ? '/' + image.type : '' )
      , extension = mime.extension(image.mimetype)
      , filename = this.id + '.' + ( extension === 'jpeg' ? 'jpg' : extension )
      , geometry = Promise.defer()
      , path = dir + '/' + filename
      , readStream = fs.createReadStream(image.path)
      , size = Promise.defer();

    var _image = gm(readStream);
    if (opts.crop === true) _image.resize(opts.geometry.width, opts.geometry.height, '^')
      .gravity('Center')
      .crop(opts.geometry.width, opts.geometry.width);
    else _image.resize(opts.geometry.width, opts.geometry.height);
    _image.stream(function (err, stdout, stderr) {
      if (err) return size.reject(new ImageError(msg.image.unknownError, 400)); // 400 Bad Request
      var writeStream = fs.createWriteStream(path);
      stdout.on('error', function (err) {
        size.reject(new ImageError(msg.image.unknownError, 400, path)); // 400 Bad Request
      });
      stdout.on('end', function () {
        size.resolve(this.bytesRead);
        fs.exists(path, function (exists) {
          if (exists) gm(fs.createReadStream(path)).size({ buffer: true }, function (err, size) {
            if (err) return geometry.reject(new ImageError(msg.image.unknownError, 400, path)); // 400 Bad Request
            geometry.resolve(size);
          });
        });
      });
      stdout.pipe(writeStream);
    });


    this.alt = image.alt;
    this.encoding = image.encoding;
    this.filename = filename;
    this.mimetype = image.mimetype;
    this.path = path;
    this.related = image.id;
    this.src = '/assets/img/' + ( image.type ? image.type + '/' : '' ) + filename;
    this.type = image.type;

    // promised values
    this.size = yield size.promise;
    this.geometry = yield geometry.promise;
  },

  /**
   * Promise-wrapper for resize generator
   *
   * @param   {object}  image                      -  image object
   * @param   {object}  [opts]                     -  image options
   * @param   {boolean} [opts.crop=true]           -  create an image that crops to exact dimensions
   * @param   {object}  [opts.geometry]            -  image geometry
   * @param   {number}  [opts.geometry.height=50]  -  image height
   * @param   {number}  [opts.geometry.width=50]   -  image width
   */
  resizePromise: function (image, opts) {
    var resize = Promise.defer();
    co(function *() {
      yield this.resize(image, opts);
      resize.resolve(this);
    }).call(this);
    return resize.promise;
  },

  /**
   * Handler for form data containing an image
   * ! LIMITED TO SINGLE IMAGE UPLOADS !
   *
   * @param   {object}  ctx                             -  koa context object
   * @param   {object}  [opts]                          -  image options
   * @param   {string}  [opts.alt=image]                -  image alt text
   * @param   {string}  [opts.type]                     -  type of image, and name of subdirectory in which to store
   * @param   {object}  [opts.limits]                   -  busboy limits
   * @param   {number}  [opts.limits.fileSize=2097152]  -  max file size in bytes
   */
  stream: function *(ctx, opts) {
    opts = opts || {};
    opts.alt = opts.alt || 'image';
    opts.type = opts.type || '';
    opts.limits = opts.limits || {};
    opts.limits.files = 1;
    opts.limits.fileSize = opts.limits.fileSize || 2097152; // 2 MB

    var part, parts = coBusboy(ctx, { limits: opts.limits });
    var dir = config.path.upload + ( opts.type ? '/' + opts.type : '' )
      , geometry = Promise.defer()
      , size = Promise.defer()
      , types = [ 'image/png', 'image/jpeg', 'image/gif' ];
    var encoding, filename, mimetype, path;

    while (part = yield parts) {
      if (!part.length) {
        if (part.mime === 'application/octet-stream' && part.filename) part.mime = mime.lookup(part.filename);

        if (types.indexOf(part.mime) >= 0) {
          var extension = mime.extension(part.mime);

          encoding = part.encoding;
          filename = this.id + '.' + ( extension === 'jpeg' ? 'jpg' : extension );
          mimetype = part.mime;
          path = dir + '/' + filename;

          // busboy stream events
          part.on('error', function (err) {
            size.reject(new ImageError(msg.image.unknownError, 400, path)); // 400 Bad Request
          });
          part.on('end', function () {
            if (this.truncated) size.reject(new ImageError(msg.image.exceedsFileSize(opts.limits.fileSize), 413, path)); // 413 Request Entity Too Large
          });

          gm(part).strip().stream(function (err, stdout, stderr) {
            if (err) return size.reject(new ImageError(msg.image.unknownError, 400, path)); // 400 Bad Request
            var writeStream = fs.createWriteStream(path);
            stdout.on('error', function (err) {
              size.reject(new ImageError(msg.image.unknownError, 400, path)); // 400 Bad Request
            });
            stdout.on('end', function () {
              size.resolve(this.bytesRead);
              fs.exists(path, function (exists) {
                if (exists) gm(fs.createReadStream(path)).size({ buffer: true }, function (err, size) {
                  if (err) return geometry.reject(new ImageError(msg.image.unknownError, 400, path)); // 400 Bad Request
                  geometry.resolve(size);
                });
              });
            });
            stdout.pipe(writeStream);
          });

        } else {
          part.resume();
          throw new ImageError(msg.image.mimeError(part.mime), 415, path); // 415 Unsupported Media Type
        }
      }
    }

    this.alt = opts.alt;
    this.encoding = encoding;
    this.filename = filename;
    this.mimetype = mimetype;
    this.path = path;
    this.src = '/assets/img/' + ( opts.type ? opts.type + '/' : '' ) + filename;
    this.type = opts.type;

    // promised values
    this.size = yield size.promise;
    this.geometry = yield geometry.promise;
  }
};

mongoose.model('Image', ImageSchema);
