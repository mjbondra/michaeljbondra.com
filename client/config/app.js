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

// Core Angular modules
require('../assets/lib/angular/angular');
require('../assets/lib/angular-cookies/angular-cookies');
require('../assets/lib/angular-animate/angular-animate');
require('../assets/lib/angular-resource/angular-resource');
require('../assets/lib/angular-route/angular-route');
require('../assets/lib/angular-touch/angular-touch');

// App Dependencies
require('../app/controllers');
require('../app/directives');
require('../app/filters');
require('../app/services');

// Router
require('./routes');

// AngularJS/App modules
var app = angular.module('mjbondra', [
  'ngAnimate',
  'ngCookies',
  'ngRoute',
  'ngTouch',
  'mjbondra.controllers',
  'mjbondra.directives',
  'mjbondra.filters',
  'mjbondra.services',
  'mjbondra.routes'
]);
