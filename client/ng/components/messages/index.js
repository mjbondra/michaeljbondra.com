'use strict';

var angular = require('angular');

require('./controllers');
require('./directives');
require('./model');

angular.module('messages', [
  'messagesControllers',
  'messagesDirectives',
  'messagesModel'
]);
