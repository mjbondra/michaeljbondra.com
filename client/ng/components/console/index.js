'use strict';

var angular = require('angular');

require('./directives');
require('./services');

angular.module('mjbondra.components.console', [
  'mjbondra.components.console.directives',
  'mjbondra.components.console.services'
]);
