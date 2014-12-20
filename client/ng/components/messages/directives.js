'use strict';

var angular = require('angular')
  , app = angular.module('messagesDirectives', []);

app.directive('messageForm', [function () {
  return {
    controller: 'MessagesNewController',
    scope: {},
    templateUrl: '/ng/components/messages/new.html'
  };
}]);
