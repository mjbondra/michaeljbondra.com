'use strict';

var angular = require('angular')
  , app = angular.module('componentsProjectsControllers', []);

app.controller('ProjectsIndexController', [
  '$scope',
  'Project',
  function ($scope, Project) {
    $scope.projects = Project.query();
  }
]);

app.controller('ProjectsShowController', [
  '$routeParams',
  '$scope',
  'Project',
  function ($routeParams, $scope, Project) {
    $scope.project = Project.get({ project: $routeParams.project });
  }
]);
