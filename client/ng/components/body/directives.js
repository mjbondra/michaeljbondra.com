'use strict';

var angular = require('angular')
  , app = angular.module('bodyDirectives', []);

app.directive('articleLocation', [
  '$location',
  function ($location) {
    return {
      link: function (scope) {
        scope.locationPath = function () {
          return $location.path();
        };
      }
    };
  }
]);
