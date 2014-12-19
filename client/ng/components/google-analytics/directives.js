'use strict';

var angular = require('angular')
  , app = angular.module('componentsGoogleAnalyticsDirectives', []);

app.directive('googleAnalytics', [
  'ga',
  function (ga) {
    return {
      link: function (scope, element, attributes) {
        ga('create', attributes.googleAnalytics, 'auto');
      }
    };
  }
]);

app.directive('sendPageview', [
  '$location',
  'ga',
  function ($location, ga) {
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
  }
]);
