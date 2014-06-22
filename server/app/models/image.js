
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
  order: Number,
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
   * @return {boolean} - whether or not image was deleted from the file system
   */
  destroy: function *() {
    if (!this.filename) return false;
    var dir = config.path.upload + ( this.type ? '/' + this.type : '' )
      , path = dir + '/' + this.filename;
    if (!(yield coFs.exists(path))) return false;
    yield coFs.unlink(path);
    return true;
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
   * @return  {object}                             -  image object
   */
  resize: function *(image, opts) {
    opts = opts || {};
    opts.crop = opts.crop === false ? false : true;
    opts.geometry = opts.geometry || {};
    opts.geometry.height = opts.geometry.height || 50;
    opts.geometry.width = opts.geometry.width || 50;

    var dir = config.path.upload + ( image.type ? '/' + image.type : '' )
      , extension = mime.extension(image.mimetype)
      , filename = this.filename = this.id + '.' + ( extension === 'jpeg' ? 'jpg' : extension )
      , geometry = Promise.defer()
      , path = dir + '/' + filename
      , size = Promise.defer()
      , source = dir + '/' + image.filename // path of image referenced by 'image' parameter
      , type = this.type = image.type;

    this.alt = image.alt;
    this.encoding = image.encoding;
    this.mimetype = image.mimetype;
    this.related = image.id;
    this.src = '/assets/img/' + ( type ? type + '/' : '' ) + filename;

    fs.exists(source, function (exists) {
      if (!exists) return size.reject(new ImageError(msg.image.unknownError, 400)); // 400 Bad Request
      var _image = gm(fs.createReadStream(source));
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
    });

    // promised values
    this.size = yield size.promise;
    this.geometry = yield geometry.promise;
    return this;
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
   * @return  {object}                                  -  image object
   */
  stream: function *(ctx, opts) {
    opts = opts || {};
    opts.alt = this.alt = opts.alt || 'image';
    opts.type = this.type = opts.type || '';
    opts.limits = opts.limits || {};
    opts.limits.files = 1;
    opts.limits.fileSize = opts.limits.fileSize || 2097152; // 2 MB

    var dir = config.path.upload + ( opts.type ? '/' + opts.type : '' )
      , geometry = Promise.defer()
      , part, parts = coBusboy(ctx, { limits: opts.limits })
      , size = Promise.defer()
      , types = [ 'image/png', 'image/jpeg', 'image/gif' ];

    while (part = yield parts) {
      if (!part.length) {
        if (part.mime === 'application/octet-stream' && part.filename) part.mime = mime.lookup(part.filename);

        if (types.indexOf(part.mime) >= 0) {
          var extension = mime.extension(part.mime)
            , filename = this.filename = this.id + '.' + ( extension === 'jpeg' ? 'jpg' : extension )
            , path = dir + '/' + filename;
          this.encoding = part.encoding;
          this.mimetype = part.mime;
          this.src = '/assets/img/' + ( opts.type ? opts.type + '/' : '' ) + filename;

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
          throw new ImageError(msg.image.mimeError(part.mime), 415); // 415 Unsupported Media Type
        }
      } else {
        console.log(part);
      }
    }

    // promised values
    this.size = yield size.promise;
    this.geometry = yield geometry.promise;
    return this;
  }
};

mongoose.model('Image', ImageSchema);
