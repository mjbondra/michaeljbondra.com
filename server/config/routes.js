var email = require('../app/middleware/email')
  , messages = require('../app/controllers/messages')
  , projects = require('../app/controllers/projects');

module.exports = function (app, config) {
  app.get('/api/projects', projects.index);
  app.post('/api/messages', email, messages.create);
};
