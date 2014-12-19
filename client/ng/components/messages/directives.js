'use strict';

var angular = require('angular')
  , app = angular.module('componentsMessagesDirectives', []);

app.directive('messageForm', [function () {
  return {
    controller: 'MessagesNewController',
    scope: {},
    templateUrl: '/ng/components/messages/new.html'
  };
}]);
