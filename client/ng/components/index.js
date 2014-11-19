'use strict';

var angular = require('angular');

require('./console');
require('./details');
require('./google-analytics');
require('./head');
require('./projects');

angular.module('mjbondra.components', [
  'mjbondra.components.console',
  'mjbondra.components.details',
  'mjbondra.components.google-analytics',
  'mjbondra.components.head',
  'mjbondra.components.projects'
]);
