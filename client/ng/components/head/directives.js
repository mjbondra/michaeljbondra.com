'use strict';

var angular = require('angular')
  , app = angular.module('headDirectives', []);

app.directive('getDescription', [
  'description',
  function (description) {
    return {
      link: function (scope) {
        scope.description = function () {
          return description.get();
        };
      }
    };
  }
]);

app.directive('getTitle', [
  'title',
  function (title) {
    return {
      link: function (scope) {
        scope.title = function () {
          return title.get();
        };
      }
    };
  }
]);

app.directive('setDescription', [
  'description',
  function (description) {
    return {
      link: function (scope, element, attributes) {
        element.ready(function () {
          description.set(attributes.setDescription || element.text());
          scope.$apply();
        });
      }
    };
  }
]);

app.directive('setTitle', [
  'title',
  function (title) {
    return {
      link: function (scope, element, attributes) {
        element.ready(function () {
          title.set(attributes.setTitle || element.text());
          scope.$apply();
        });
      }
    };
  }
]);
