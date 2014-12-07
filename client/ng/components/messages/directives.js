'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.messages.directives', []);

app.directive('messages', [function () {
  return {
    link: function () {},
    templateUrl: '/ng/components/messages/index.html'
  };
}]);
