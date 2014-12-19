'use strict';

var angular = require('angular');

require('./directives');
require('./services');

angular.module('componentsGoogleRecaptcha', [
  'componentsGoogleRecaptchaDirectives',
  'componentsGoogleRecaptchaServices'
]);
