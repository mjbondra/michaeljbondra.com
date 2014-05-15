'use strict';

var app = angular.module('mjbondra.routes', []);

/**
 * Routes
 */
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/', {
    templateUrl: '/app/views/home.html',
    controller: 'home'
  });

  $routeProvider.when('/projects', {
    templateUrl: '/app/views/projects.html',
    controller: 'projects.index'
  });

  // default route
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);
