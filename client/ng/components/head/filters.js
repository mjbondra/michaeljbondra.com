'use strict';

var angular = require('angular')
, app = angular.module('mjbondra.components.head.filters', []);

app.filter('formatDescription', [function () {
  return function (description) {
    return description ?
      description.trim().replace(/\r?\n|\r/g, '') :
      '';
  };
}]);

app.filter('formatTitle', [function () {
  return function (title) {
    return title ?
      title + ' | Michael J. Bondra' :
      'Michael J. Bondra';
  };
}]);
