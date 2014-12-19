'use strict';

var angular = require('angular')
  , app = angular.module('componentsProjectsModel', ['ngResource']);

app.factory('Project', [
  '$resource',
  function ($resource) {
    return $resource('api/projects/:project');
  }
]);
