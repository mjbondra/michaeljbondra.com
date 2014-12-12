'use strict';

var angular = require('angular');

require('./directives');
require('./services');

angular.module('mjbondra.components.forms', [
  'mjbondra.components.forms.directives',
  'mjbondra.components.forms.services'
]);
