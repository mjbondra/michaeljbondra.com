var email = require('../middleware/email')
  , messages = require('../components/messages/controllers')
  , projects = require('../components/projects/controllers');

module.exports = function (app) {
  app.get('/api/projects', projects.index);
  app.post('/api/messages', email, messages.create);
};
