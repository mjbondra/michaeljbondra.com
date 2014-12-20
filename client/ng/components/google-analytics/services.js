'use strict';

var angular = require('angular')
  , app = angular.module('googleAnalyticsServices', []);

app.factory('ga', [
  '$location',
  '$window',
  function ($location, $window) {
    $window.GoogleAnalyticsObject = 'ga';
    $window.ga = $window.ga || function () {
      ($window.ga.q = $window.ga.q || []).push(arguments);
    };
    $window.ga.l = 1 * new Date();
    return $window.ga;
  }
]);
