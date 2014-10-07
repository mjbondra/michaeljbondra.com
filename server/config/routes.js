var projects = require('../app/controllers/projects');

module.exports = function (app, config) {
  app.get('/api/projects', projects.index);
}
