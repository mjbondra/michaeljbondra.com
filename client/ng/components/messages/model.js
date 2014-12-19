'use strict';

var angular = require('angular')
  , app = angular.module('componentsMessagesModel', ['ngResource']);

app.factory('Message', [
  '$resource',
  function ($resource) {
    return $resource('api/messages/:message');
  }
]);
