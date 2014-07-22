
/**
 * Module dependencies
 */
var compress = require('koa-compress')
  , logger = require('koa-logger')
  , mongooseStore = require('koa-session-mongoose')
  , router = require('koa-router')
  , session = require('koa-generic-session')
  , static = require('koa-static');

/**
 * Middleware
 */
var error = require('../app/middleware/error')
  , notFound = require('../app/middleware/404')
  , user = require('../app/controllers/users').sessions.show;

module.exports = function (app, config) {

  // logger
  if (config.env !== 'test') app.use(logger());

  // compression
  app.use(compress());

  // error handling middleware
  app.use(error());

  // static files
  app.use(static(config.path.static));

  // sessions
  app.keys = config.secrets;
  app.use(session({
    cookie: {
      httpOnly: false,
      maxage: 1000 * 60 * 60 * 24 * 14 // 2 weeks
    },
    store: mongooseStore.create()
  }));
  app.use(user());

  // api routes
  app.use(router(app));

  // 404 Not Found
  app.use(notFound());
};
