'use strict';

var angular = require('angular');

require('./body');
require('./console');
require('./details');
require('./google-analytics');
require('./head');
require('./messages');
require('./navigation');
require('./projects');
require('./scroll');
require('./styles');

angular.module('mjbondra.components', [
  'mjbondra.components.body',
  'mjbondra.components.console',
  'mjbondra.components.details',
  'mjbondra.components.google-analytics',
  'mjbondra.components.head',
  'mjbondra.components.messages',
  'mjbondra.components.navigation',
  'mjbondra.components.projects',
  'mjbondra.components.scroll',
  'mjbondra.components.styles'
]);
