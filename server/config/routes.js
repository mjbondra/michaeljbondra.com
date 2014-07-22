
/**
 * Module dependencies.
 */
var send = require('koa-send');

/**
 * Controllers
 */
var projects = require('../app/controllers/projects')
  , snippets = require('../app/controllers/snippets')
  , users = require('../app/controllers/users');

module.exports = function (app, config) {

  // projects
  app.get('/api/projects', projects.index);
  app.post('/api/projects', projects.create);
  app.get('/api/projects/:project', projects.findOne, projects.show);
  app.put('/api/projects/:project', projects.findOne, projects.update);
  app.delete('/api/projects/:project', projects.findOne, projects.destroy);
  app.post('/api/projects/:project/images', projects.findOne, projects.images.create);
  app.put('/api/projects/:project/images/:image', projects.findOne, projects.images.update);
  app.delete('/api/projects/:project/images/:image', projects.findOne, projects.images.destroy);

  // snippets
  app.get('/api/snippets', snippets.index);
  app.post('/api/snippets', snippets.create);
  app.get('/api/snippets/:snippet', snippets.findOne, snippets.show);
  app.put('/api/snippets/:snippet', snippets.findOne, snippets.update);
  app.delete('/api/snippets/:snippet', snippets.findOne, snippets.destroy);

  // users
  app.get('/api/users', users.index);
  app.post('/api/users', users.create);
  app.get('/api/users/:user', users.findOne, users.show);
  app.put('/api/users/:user', users.findOne, users.update);
  app.delete('/api/users/:user', users.findOne, users.destroy);

  // redirect all remaining GET method routes to angular router
  app.get(/.*/, function *() {
    yield send(this, config.path.static + '/index.html');
  });
};
