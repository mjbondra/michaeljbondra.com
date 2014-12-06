'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.scroll.directives', ['duScroll']);

app.directive('scrollHome', ['$document', function ($document) {
  return {
    link: function (scope, element) {
      var duration = 250; // ms

      element.on('click', function () {
        $document.scrollTop(0, duration);
      });

      scope.$on('$destroy', function () {
        element.off('click');
      });
    }
  };
}]);

app.directive('scrollOnClick', ['$document', function ($document) {
  return {
    link: function (scope, element, attributes) {
      var duration = 250 // ms
        , offset = attributes.scrollOffset ?
            parseInt(attributes.scrollOffset, 10) :
            0;

      element.on('click', function (e) {
        e.preventDefault();

        var targetId = attributes.href.replace(/.*(?=#[^\s]+$)/, '').slice(1)
          , targetElement = document.getElementById(targetId);

        $document.scrollToElement(
          angular.element(targetElement),
          offset,
          duration
        );
      });

      scope.$on('$destroy', function () {
        element.off('click');
      });
    }
  };
}]);

app.directive('scrollTo', ['$document', function ($document) {
  return {
    link: function (scope, element, attributes) {
      var duration = 250 // ms
        , offset = attributes.scrollOffset ?
            parseInt(attributes.scrollOffset, 10) :
            0; // px

      $document.scrollToElement(element, offset, duration);
    }
  };
}]);
