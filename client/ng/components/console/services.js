'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.console.services', []);

app.service('Consolator', [function () {
  return require('consolator');
}]);
