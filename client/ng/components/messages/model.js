'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.messages.model', ['ngResource']);

app.factory('Message', [
  '$resource',
  function ($resource) {
    return $resource('api/messages/:message');
  }
]);
