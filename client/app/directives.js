'use strict';

var app = angular.module('mjbondra.directives', []);

/**
 * Add field
 */
app.directive('addField', [function () {
  return {
    scope: {
      addField: '='
    },
    link: function (scope, element, attributes) {
      element.ready(function () {
        element.on('click', function () {
          scope.addField.push({});
          scope.$apply();
        });
        scope.$on('$destroy', function () {
          element.off('click');
        });
      });
    }
  };
}]);

/**
 * Remove field
 */
app.directive('removeField', [function () {
  return {
    scope: {
      removeField: '='
    },
    link: function (scope, element, attributes) {
      element.ready(function () {
        if (!attributes.index) return;
        element.on('click', function () {
          scope.removeField.splice(attributes.index, 1);
          scope.$apply();
        });
        scope.$on('$destroy', function () {
          element.off('click');
        });
      });
    }
  };
}]);
