'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.projects.model', ['ngResource']);

app.factory('Project', ['$resource', function ($resource) {
  return $resource('api/projects/:project');
}]);
