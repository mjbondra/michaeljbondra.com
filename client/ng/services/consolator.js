'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.services.consolator', []);

app.service('Consolator', [function () {
  return require('consolator');
}]);
