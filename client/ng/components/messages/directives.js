'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.messages.directives', []);

app.directive('messages', [function () {
  return {
    controller: 'messages.new',
    templateUrl: '/ng/components/messages/index.html'
  };
}]);
