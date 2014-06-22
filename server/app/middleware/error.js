
/**
 * Module dependencies
 */
var cU = require('../../assets/lib/common-utilities')
  , mongoose = require('mongoose')
  , msg = require('../../config/messages')
  , Promise = require('bluebird')
  , _ = require('underscore');

/**
 * Error model
 */
var Schema = mongoose.Schema
  , ErrorSchema = new Schema({
    method: String,
    params: Object,
    referer: String,
    stack: String,
    status: Number,
    url: String,
    user: {
      type : Schema.ObjectId,
      ref : 'User'
    },
    userIP: String
  }), _Error = mongoose.model('Error', ErrorSchema);

/**
 * Validation error names
 */
var validationErrors = [
  'ImageError',
  'MongoError',
  'ValidationError'
];

module.exports = function () {
  return function *(next) {
    try {
      yield next;

    // error handling for downstream middleware
    } catch (err) {

      // shift rejection errors to their cause if they involve validation
      if (err.name === 'RejectionError' && err.cause && validationErrors.indexOf(err.cause.name) >= 0) err = err.cause;

      // validation errors
      if (validationErrors.indexOf(err.name) > -1) {

        // Mongo errors
        if (err.name === 'MongoError' && err.err && (err.code === 11000 || err.code === 11001)) { // duplicate key
          var mongoError = err.err.match(/index:.*\.(.*)\.\$(.*)_.*dup\skey:\s{\s:\s"(.*)"/);
          var dbCollection = ( mongoError ? mongoError[1] : 'content' );
          var collectionField = ( mongoError ? mongoError[2] : 'field' );
          var fieldValue = ( mongoError ? mongoError[3] : 'value' );
          this.status = 409; // 409 Conflict
          this.body = yield cU.body(cU.msg(msg.notUnique(dbCollection, collectionField, fieldValue), 'validation', collectionField, fieldValue));

        // Mongoose validation errors
        } else if (err.name === 'ValidationError' && err.errors) {
          var msgJSONArray = [];
          var objKeys = Object.keys(err.errors);
          objKeys.forEach(function (key) {
            msgJSONArray.push(cU.msg(err.errors[key].message, 'validation', err.errors[key].path, err.errors[key].value));
          });
          this.status = 422; // 422 Unprocessable Entity
          this.body = yield cU.body(msgJSONArray);

        // Image validation errors
        } else if (err.name === 'ImageError' && err.message) {
          if (err.path) cU.unlink(err.path);
          this.status = err.status || 400; // 400 Bad Request
          this.body = yield cU.body(cU.msg(err.message, 'validation', 'image'));
        }

      // non-validation errors
      } else {
        try {
          var _error = new _Error({ // record errors as Mongoose-modeled documents
            method: this.method,
            referer: this.header.referer,
            stack: err.stack,
            status: err.status || 500,
            url: this.url,
            user: this.session && this.session.user ? this.session.user.id ? this.session.user.id  : this.session.user : null,
            userIP: this.ip
          });
          yield Promise.promisify(_error.save, _error)();
        } catch (_err) {
          console.error(_err.stack || _err); // print error logging error to console, but do not overwrite original error
        }
        this.status = err.status || 500;
        this.body = yield cU.body(cU.msg(msg.status[err.status || 500], 'error'));
      }
    }
  };
};
