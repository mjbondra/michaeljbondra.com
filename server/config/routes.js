var email = require('../components/messages/middleware').email
  , messages = require('../components/messages/controllers')
  , projects = require('../components/projects/controllers')
  , status = require('../components/status/controllers');

module.exports = function (app) {

  // messages
  app.post('/api/messages', email, messages.create);

  // projects
  app.get('/api/projects', projects.index);
  app.get('/api/projects/:project', projects.show);

  // status
  app.get('/api/status', status.show);
};
