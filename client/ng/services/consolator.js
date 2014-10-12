'use strict';

var app = angular.module('mjbondra.services.consolator', []);

app.service('Consolator', [function () {
  return require('consolator');
}]);
