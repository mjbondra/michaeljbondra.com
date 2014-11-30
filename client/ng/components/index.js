'use strict';

var angular = require('angular');

require('./body');
require('./console');
require('./details');
require('./google-analytics');
require('./head');
require('./projects');
require('./styles');

angular.module('mjbondra.components', [
  'mjbondra.components.body',
  'mjbondra.components.console',
  'mjbondra.components.details',
  'mjbondra.components.google-analytics',
  'mjbondra.components.head',
  'mjbondra.components.projects',
  'mjbondra.components.styles'
]);
