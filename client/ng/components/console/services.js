'use strict';

var angular = require('angular')
  , app = angular.module('componentsConsoleServices', []);

app.service('Consolator', [function () {
  return require('consolator');
}]);
