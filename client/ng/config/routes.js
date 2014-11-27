'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.config.routes', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/', {
    templateUrl: '/ng/components/details/index.html',
    controller: 'details.index'
  });

  $routeProvider.when('/projects/:project', {
    templateUrl: '/ng/components/projects/show.html',
    controller: 'projects.show'
  });

  // default route
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);
