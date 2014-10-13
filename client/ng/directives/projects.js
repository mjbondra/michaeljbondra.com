'use strict';

var app = angular.module('mjbondra.directives.projects', []);

app.directive('projects', ['$document', 'api', 'projectStyles', function ($document, api, projectStyles) {
  return {
    link: function (scope, element, attributes) {
      var head = $document.find('head')
        , style = angular.element('<style type="text/css"></style>');

      api('/api/projects').success(function (projects) {
        scope.projects = projects;
        style.text(projectStyles(projects));
        head.prepend(style);

      }).error(function (err) {
        scope.projects = [];
      });
    },
    scope: true,
    templateUrl: '/ng/views/projects/index.html'
  };
}]);
