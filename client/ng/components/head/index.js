'use strict';

var angular = require('angular');

require('./directives');
require('./filters');
require('./services');

angular.module('head', [
  'headDirectives',
  'headFilters',
  'headServices'
]);
