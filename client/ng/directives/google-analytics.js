'use strict';

var app = angular.module('mjbondra.directives.google-analytics', []);

app.directive('googleAnalytics', ['$location', 'ga', function ($location, ga) {
  return {
    link: function (scope, element, attributes) {
      if ($location.host() !== 'mjbondra.com') return;

      ga('create', scope.googleAnalytics, 'auto');
      ga('send', 'pageview');
    },
    scope: {
      googleAnalytics: '@'
    }
  };
}]);
