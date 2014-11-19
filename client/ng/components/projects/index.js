'use strict';

var angular = require('angular');

require('./controllers');
require('./directives');
require('./services');

angular.module('mjbondra.components.projects', [
  'mjbondra.components.projects.controllers',
  'mjbondra.components.projects.directives',
  'mjbondra.components.projects.services'
]);
