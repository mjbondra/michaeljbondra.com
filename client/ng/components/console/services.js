'use strict';

var angular = require('angular')
  , app = angular.module('consoleServices', []);

app.service('Consolator', [function () {
  return require('consolator');
}]);
