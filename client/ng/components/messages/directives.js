'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.messages.directives', []);

app.directive('messageForm', [function () {
  return {
    controller: 'messages.new',
    templateUrl: '/ng/components/messages/new.html'
  };
}]);
