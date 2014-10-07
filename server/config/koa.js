
var compress = require('koa-compress')
  , logger = require('koa-logger')
  , router = require('koa-router')
  , static = require('koa-static');

var error = require('../app/middleware/error')
  , notFound = require('../app/middleware/404');

module.exports = function (app, config) {
  if (config.env !== 'test') app.use(logger());
  app.use(error());
  app.use(compress());
  app.use(static(config.path.static));
  app.use(router(app));
  app.use(notFound());
}
