
/**
 * Module dependencies.
 */
var send = require('koa-send');

module.exports = function (app, config) {

  // redirect all remaining GET method routes to angular router
  app.get('*', function *() {
    yield send(this, config.path.static + '/index.html');
  });
};
