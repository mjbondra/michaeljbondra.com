'use strict';

var angular = require('angular');

require('./controllers');
require('./directives');
require('./model');
require('./services');

angular.module('componentsProjects', [
  'componentsProjectsControllers',
  'componentsProjectsDirectives',
  'componentsProjectsModel',
  'componentsProjectsServices'
]);
