var mongoose = require('mongoose')
, Bluebird = require('bluebird');

var _Error = mongoose.model('Error');

exports.error = function () {
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
        yield Bluebird.promisify(_error.save, _error)();
      } catch (_err) {
        console.error(err.stack || err); // original error
        console.error(_err.stack || _err); // error-logging error
      }
      this.status = err.status || 500;
      this.body = {
        msg: 'Internal server error',
        status: this.status
      };
    }
  };
};

exports.notFound = function () {
  return function *() {
    this.status = 404;
    this.body = {
      msg: 'Not found',
      status: this.status
    };
  };
};
