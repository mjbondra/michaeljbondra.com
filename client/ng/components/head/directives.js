'use strict';

var angular = require('angular')
, app = angular.module('mjbondra.components.head.directives', []);

app.directive('getTitle', ['title', function (title) {
  return {
    link: function (scope) {
      scope.title = function () {
        return title.get();
      };
    }
  };
}]);

app.directive('setTitle', ['title', function (title) {
  return {
    link: function (scope, element, attributes) {
      element.ready(function () {
        title.set(attributes.setTitle || element.text());
        scope.$apply();
      });
    }
  };
}]);
