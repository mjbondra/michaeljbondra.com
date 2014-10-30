
var compress = require('koa-compress')
  , logger = require('koa-logger')
  , router = require('koa-router')
  , static = require('koa-static');

var error = require('../middleware/error')
  , notFound = require('../middleware/404');

module.exports = function (app, config) {
  if (config.env !== 'test') app.use(logger());
  app.use(error());
  app.use(compress());
  app.use(static(config.path.static, { maxage: 1000 * 60 * 60 * 24 * 7 }));
  app.use(router(app));
  app.use(notFound());
};
