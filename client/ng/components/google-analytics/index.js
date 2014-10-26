'use strict';

var angular = require('angular');

require('./directives');
require('./services');

angular.module('mjbondra.components.google-analytics', [
  'mjbondra.components.google-analytics.directives',
  'mjbondra.components.google-analytics.services'
]);
