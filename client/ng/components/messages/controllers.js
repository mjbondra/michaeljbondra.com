'use strict';

var angular = require('angular')
  , app = angular.module('componentsMessagesControllers', []);

app.controller('MessagesNewController', [
  '$scope',
  'Message',
  function ($scope, Message) {
    $scope.message = new Message();
  }
]);
