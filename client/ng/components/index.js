'use strict';

var angular = require('angular');

require('./body');
require('./console');
require('./details');
require('./forms');
require('./google-analytics');
require('./google-recaptcha');
require('./head');
require('./messages');
require('./navigation');
require('./projects');
require('./scroll');
require('./styles');

angular.module('components', [
  'componentsBody',
  'componentsConsole',
  'componentsDetails',
  'componentsForms',
  'componentsGoogleAnalytics',
  'componentsGoogleRecaptcha',
  'componentsHead',
  'componentsMessages',
  'componentsNavigation',
  'componentsProjects',
  'componentsScroll',
  'componentsStyles'
]);
