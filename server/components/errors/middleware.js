var mongoose = require('mongoose')
  , Bluebird = require('bluebird');

var _Error = mongoose.model('Error');

var errorActions = {
  defaultError: function (err, ctx) {
    ctx.status = err.status || 500;
    ctx.body = {
      msg: 'Internal server error',
      status: ctx.status
    };
  },

  RejectionError: function (err, ctx) { // shift rejection errors to their cause
    var _err = err.cause ? err.cause : err;
    this[this[_err.name] ? _err.name : 'defaultError'](_err, ctx);
  },

  ValidationError: function (err, ctx) {
    var errorArray = []
      , objKeys = Object.keys(err.errors);

    for (var i = 0; i < objKeys.length; i++) {
      errorArray.push({
        msg: err.errors[objKeys[i]].message,
        field: err.errors[objKeys[i]].path,
        value: err.errors[objKeys[i]].value
      });
    }

    ctx.status = 422; // 422 Unprocessable Entity
    ctx.body = {
      errors: errorArray,
      msg: 'Validation error',
      status: ctx.status
    };
  }
};

exports.error = function () {
  return function *(next) {
    try {
      yield next;
    } catch (err) {
      try {
        errorActions[errorActions[err.name] ?
          err.name :
          'defaultError'
        ](err, this);

        var _error = new _Error({ // record errors as Mongoose-modeled documents
          ip: this.ip,
          method: this.method,
          referer: this.header.referer,
          stack: err.stack,
          status: this.status,
          url: this.url
        });
        yield Bluebird.promisify(_error.save, _error)();
      } catch (_err) {
        console.error(err.stack || err); // original error
        console.error(_err.stack || _err); // error-logging error
      }
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
