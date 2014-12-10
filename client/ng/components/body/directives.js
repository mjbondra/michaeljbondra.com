'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.body.directives', []);

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
