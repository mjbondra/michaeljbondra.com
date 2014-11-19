'use strict';

var angular = require('angular');

require('./directives');
require('./services');

angular.module('mjbondra.components.head', [
  'mjbondra.components.head.directives',
  'mjbondra.components.head.services'
]);
