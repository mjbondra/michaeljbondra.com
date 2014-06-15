'use strict';

var app = angular.module('mjbondra.directives', []);

/**
 * Add field
 *
 * @param {string} attribute.addField - array in parent scope upon which additional objects may be added
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
 *
 * @param {number} attribute.index - index of value to remove in parent scope array
 * @param {string} attribute.removeField - array in parent scope upon which objects may be removed
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
