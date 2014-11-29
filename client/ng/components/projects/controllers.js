'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.projects.controllers', []);

app.controller('projects.index', [
  '$scope',
  'Project',
  function ($scope, Project) {
    $scope.projects = Project.query();
  }
]);

app.controller('projects.show', [
  '$routeParams',
  '$scope',
  'Project',
  function ($routeParams, $scope, Project) {
    $scope.project = Project.get({ project: $routeParams.project });
  }
]);
