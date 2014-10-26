'use strict';

var angular = require('angular');

require('./console');
require('./google-analytics');
require('./projects');

angular.module('mjbondra.components', [
  'mjbondra.components.console',
  'mjbondra.components.google-analytics',
  'mjbondra.components.projects'
]);
