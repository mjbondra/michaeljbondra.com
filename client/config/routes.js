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

  $routeProvider.when('/work', {
    templateUrl: '/app/views/work/index.html',
    controller: 'work.index'
  });
  $routeProvider.when('/work/:work', {
    templateUrl: '/app/views/work/show.html',
    controller: 'work.show'
  });

  // default route
  $routeProvider.otherwise({
    redirectTo: '/about'
  });
}]);
