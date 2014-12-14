'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.google-recaptcha.services', []);

app.factory('grecaptcha', [
  '$window',
  function ($window) {
    return $window.grecaptcha;
  }
]);
