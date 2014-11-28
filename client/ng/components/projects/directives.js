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

app.directive('projectThumbnails', [
  '$document',
  'projectThumbnailStyles',
  function ($document, projectThumbnailStyles) {
    return {
      link: function (scope) {
        var head = $document.find('head')
          , style = angular.element('<style type="text/css"></style>');

        style.text(projectThumbnailStyles(scope.projectThumbnails));
        head.prepend(style);
      },
      scope: {
        projectThumbnails: '='
      }
    };
  }
]);
