'use strict';

var app = angular.module('mjbondra.routes', []);

/**
 * Routes
 */
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/about', {
    templateUrl: '/app/views/about/index.html',
    controller: 'about'
  });

  $routeProvider.when('/contact', {
    templateUrl: '/app/views/contact/index.html',
    controller: 'contact'
  });

  $routeProvider.when('/projects', {
    templateUrl: '/app/views/projects/index.html',
    controller: 'projects.index'
  });
  $routeProvider.when('/projects/:project', {
    templateUrl: '/app/views/projects/show.html',
    controller: 'project.show'
  });

  // default route
  $routeProvider.otherwise({
    redirectTo: '/about'
  });
}]);
