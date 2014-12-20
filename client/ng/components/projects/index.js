'use strict';

var angular = require('angular');

require('./controllers');
require('./directives');
require('./model');
require('./services');

angular.module('projects', [
  'projectsControllers',
  'projectsDirectives',
  'projectsModel',
  'projectsServices'
]);
