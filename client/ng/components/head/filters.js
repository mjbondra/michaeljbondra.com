'use strict';

var angular = require('angular')
, app = angular.module('mjbondra.components.head.filters', []);

app.filter('title', function () {
  return function (input) {
    return input ? input + ' | Michael J. Bondra' : 'Michael J. Bondra';
  };
});
