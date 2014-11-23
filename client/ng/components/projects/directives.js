'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.projects.directives', []);

app.directive('projects', [function () {
  return {
    controller: 'projects.index',
    scope: true,
    templateUrl: '/ng/components/projects/index.html'
  };
}]);
