'use strict';

var angular = require('angular');

require('./directives');
require('./filters');

angular.module('mjbondra.components.body', [
  'mjbondra.components.body.directives',
  'mjbondra.components.body.filters'
]);
