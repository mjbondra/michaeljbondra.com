'use strict';

var angular = require('angular')
  , app = angular.module('componentsHeadFilters', []);

app.filter('formatDescription', [function () {
  return function (description) {
    return description ?
      description.trim().replace(/\r?\n|\r/g, '') :
      '';
  };
}]);

app.filter('formatTitle', [
  '$location',
  function ($location) {
    return function (title) {
      var base = 'Michael J. Bondra';
      return title ?
        $location.path() === '/' ?
          base + ' | ' + title :
          title + ' | ' + base :
        base;
    };
  }
]);
