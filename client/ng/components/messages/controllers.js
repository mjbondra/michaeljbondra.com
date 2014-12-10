'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.messages.controllers', []);

app.controller('messages.new', [
  '$scope',
  'Message',
  function ($scope, Message) {
    $scope.message = new Message();
  }
]);
