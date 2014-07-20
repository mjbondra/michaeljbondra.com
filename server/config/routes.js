
/**
 * Module dependencies.
 */
var send = require('koa-send');

/**
 * Controllers
 */
var projects = require('../app/controllers/projects')
  , descriptions = require('../app/controllers/descriptions');

module.exports = function (app, config) {

  // descriptions
  app.get('/api/descriptions', descriptions.index);
  app.post('/api/descriptions', descriptions.create);
  app.get('/api/descriptions/:description', descriptions.findOne, descriptions.show);
  app.put('/api/descriptions/:description', descriptions.findOne, descriptions.update);
  app.delete('/api/descriptions/:description', descriptions.findOne, descriptions.destroy);

  // projects
  app.get('/api/projects', projects.index);
  app.post('/api/projects', projects.create);
  app.get('/api/projects/:project', projects.findOne, projects.show);
  app.put('/api/projects/:project', projects.findOne, projects.update);
  app.delete('/api/projects/:project', projects.findOne, projects.destroy);
  app.post('/api/projects/:project/images', projects.findOne, projects.images.create);
  app.put('/api/projects/:project/images/:image', projects.findOne, projects.images.update);
  app.delete('/api/projects/:project/images/:image', projects.findOne, projects.images.destroy);

  // redirect all remaining GET method routes to angular router
  app.get(/.*/, function *() {
    yield send(this, config.path.static + '/index.html');
  });
};
