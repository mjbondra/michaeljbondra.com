'use strict';

/**
 *                     88 88                                           88
 *                     "" 88                                           88
 *                        88                                           88
 *  88,dPYba,,adPYba,  88 88,dPPYba,   ,adPPYba,  8b,dPPYba,   ,adPPYb,88 8b,dPPYba, ,adPPYYba,
 *  88P'   "88"    "8a 88 88P'    "8a a8"     "8a 88P'   `"8a a8"    `Y88 88P'   "Y8 ""     `Y8
 *  88      88      88 88 88       d8 8b       d8 88       88 8b       88 88         ,adPPPPP88
 *  88      88      88 88 88b,   ,a8" "8a,   ,a8" 88       88 "8a,   ,d88 88         88,    ,88
 *  88      88      88 88 8Y"Ybbd8"'   `"YbbdP"'  88       88  `"8bbdP"Y8 88         `"8bbdP"Y8
 *                    ,88
 *                  888P"
 */

// App Dependencies
require('./directives/console');
require('./directives/google-analytics');
require('./directives/projects');
require('./services/api');
require('./services/consolator');
require('./services/console-styles');
require('./services/google-analytics');
require('./services/project-styles');
require('./services/send');

// AngularJS/App modules
var app = angular.module('mjbondra', [
  'ngTouch',
  'mjbondra.directives.console',
  'mjbondra.directives.google-analytics',
  'mjbondra.directives.projects',
  'mjbondra.services.api',
  'mjbondra.services.consolator',
  'mjbondra.services.console-styles',
  'mjbondra.services.google-analytics',
  'mjbondra.services.project-styles',
  'mjbondra.services.send'
]);
