'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.projects.directives', []);

app.directive('projects', [function () {
  return {
    controller: 'projects.index',
    templateUrl: '/ng/components/projects/index.html'
  };
}]);

/**
 * Project styles
 *
 * ex. <nav data-project="projects" data-project-styles="thumbnails">
 * ex. <section data-project="project" data-project-styles="background">
 *
 * @param {object} scope.project - project or array projects
 * @param {string} attributes.projectStyles - 'thumbnails' or 'background'
 */
app.directive('projectStyles', [
  '$document',
  'projectPageStyles',
  'projectThumbnailStyles',
  function ($document, projectPageStyles, projectThumbnailStyles) {
    return {
      link: function (scope, element, attributes) {
        var head = $document.find('head')
          , style = angular.element('<style type="text/css"></style>')
          , type = attributes.projectStyles;

        if (type === 'thumbnails')
          style.text(projectThumbnailStyles(scope.project));
        else if (type === 'background')
          style.text(projectPageStyles(scope.project));

        head.prepend(style);

        scope.$on('$destroy', function () {
          style.remove();
        });
      },
      scope: {
        project: '='
      }
    };
  }
]);
