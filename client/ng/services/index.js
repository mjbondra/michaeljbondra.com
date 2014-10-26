'use strict';

var angular = require('angular');

require('./api');
require('./consolator');
require('./send');

angular.module('mjbondra.services', [
  'mjbondra.services.api',
  'mjbondra.services.consolator',
  'mjbondra.services.send'
]);
