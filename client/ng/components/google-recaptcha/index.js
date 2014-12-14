'use strict';

var angular = require('angular');

require('./directives');
require('./services');

angular.module('mjbondra.components.google-recaptcha', [
  'mjbondra.components.google-recaptcha.directives',
  'mjbondra.components.google-recaptcha.services'
]);
