'use strict';

var angular = require('angular');

require('./directives');
require('./filters');
require('./services');

angular.module('componentsHead', [
  'componentsHeadDirectives',
  'componentsHeadFilters',
  'componentsHeadServices'
]);
