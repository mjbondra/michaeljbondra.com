'use strict';

var angular = require('angular');

require('./directives');
require('./filters');

angular.module('body', [
  'bodyDirectives',
  'bodyFilters'
]);
