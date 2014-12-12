'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.forms.services', []);

app.factory('formServerError', [function () {
  return function () {};
}]);

app.factory('formServerSuccess', [function () {
  return function () {};
}]);

app.factory('formValidationError', [function () {
  return function () {};
}]);
