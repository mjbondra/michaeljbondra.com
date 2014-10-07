var mongoose = require('mongoose')
  , Promise = require('bluebird');

var Schema = mongoose.Schema
  , ErrorSchema = new Schema({
    ip: String,
    method: String,
    referer: String,
    stack: String,
    status: Number,
    url: String
  }), _Error = mongoose.model('Error', ErrorSchema);

module.exports = function () {
  return function *(next) {
    try {
      yield next;
    } catch (err) {
      try {
        var _error = new _Error({ // record errors as Mongoose-modeled documents
          ip: this.ip,
          method: this.method,
          referer: this.header.referer,
          stack: err.stack,
          status: err.status || 500,
          url: this.url
        });
        yield Promise.promisify(_error.save, _error)();
      } catch (_err) {
        console.error(_err.stack || _err); // print error logging error to console, but do not overwrite original error
      }
      this.status = err.status || 500;
      this.body = {
        msg: 'There was an error',
        status: this.status
      };
    }
  }
}
