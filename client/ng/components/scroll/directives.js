'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.scroll.directives', ['duScroll']);

app.directive('scrollTo', ['$document', function($document) {
  return {
    link: function (scope, element) {
      var duration = 250 // ms
        , offset = 30; // px

      $document.scrollToElement(element, offset, duration);
    }
  };
}]);
