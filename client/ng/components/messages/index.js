'use strict';

var angular = require('angular');

require('./controllers');
require('./directives');
require('./model');

angular.module('mjbondra.components.messages', [
  'mjbondra.components.messages.controllers',
  'mjbondra.components.messages.directives',
  'mjbondra.components.messages.model'
]);
