var co = require('co')
  , msg = require('../../../shared/status-messages').validation
  , querystring = require('querystring')
  , request = require('koa-request');

// use environment-specific configuration; 'development' is default
var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , secretKey = config.googleRecaptcha.secretKey
  , url = 'https://www.google.com/recaptcha/api/siteverify';

/**
 * Google reCAPTCHA validate
 *
 * @params {string}   model - Mongoose model
 * @params {function} next  - Mongoose 'next' callback
 * @params {string}   [ip]  - IP address associated with request
 */
exports.validate = function (model, next, ip) {
  co(function *() {
    if (env === 'test') return; // skip reCAPTCHA validation in test environment
    if (!model.gRecaptchaResponse)
      return model.invalidate('gRecaptchaResponse', msg.gRecaptchaResponse.required);

    var qo = {
      secret: secretKey,
      response: model.gRecaptchaResponse,
    };
    if (ip) qo.remoteip = ip;
    var qs = '?' + querystring.stringify(qo);

    try {
      var res = yield request(url + qs)
        , body = JSON.parse(res.body);

      if (!body.success)
        return model.invalidate('gRecaptchaResponse', msg.gRecaptchaResponse.unknown);

    } catch (err) {
      console.error(err);
      model.invalidate('gRecaptchaResponse', msg.gRecaptchaResponse.unknown);
    }
  }).then(next);
};
