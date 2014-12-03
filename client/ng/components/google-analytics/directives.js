'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.google-analytics.directives', []);

app.directive('googleAnalytics', ['$location', 'ga', function ($location, ga) {
  return {
    link: function (scope) {
      ga('create', scope.googleAnalytics, 'auto');
    },
    scope: {
      googleAnalytics: '@'
    }
  };
}]);

app.directive('sendPageview', ['$location', 'ga', function ($location, ga) {
  return {
    link: function (scope, element, attributes) {
      element.ready(function () {
        ga('send', 'pageview', {
          page: $location.path(),
          title: attributes.sendPageview || element.text()
        });
      });
    }
  };
}]);
