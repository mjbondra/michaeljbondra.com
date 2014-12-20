'use strict';

var angular = require('angular')
  , app = angular.module('navigationDirectives', []);

app.directive('navigationToggle', [function () {
  return {
    link: function (scope, element) {
      var classActive = 'navigation-active';

      element.on('click', function () {
        element.toggleClass(classActive);
      });

      scope.$on('$destroy', function () {
        element.off('click');
      });
    }
  };
}]);
