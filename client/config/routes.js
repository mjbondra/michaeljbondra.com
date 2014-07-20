'use strict';

var app = angular.module('mjbondra.routes', []);

/**
 * Routes
 */
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  // static page routes
  $routeProvider.when('/', {
    templateUrl: '/app/views/index.html',
    controller: 'home'
  });
  $routeProvider.when('/about', {
    templateUrl: '/app/views/about/index.html',
    controller: 'about'
  });
  $routeProvider.when('/contact', {
    templateUrl: '/app/views/contact/index.html',
    controller: 'contact'
  });

  // description routes
  $routeProvider.when('/descriptions', {
    templateUrl: '/app/views/descriptions/index.html',
    controller: 'descriptions.index'
  });
  $routeProvider.when('/descriptions/new', {
    templateUrl: '/app/views/descriptions/new.html',
    controller: 'descriptions.new'
  });
  $routeProvider.when('/descriptions/:description', {
    templateUrl: '/app/views/descriptions/show.html',
    controller: 'descriptions.show'
  });
  $routeProvider.when('/descriptions/:description/edit', {
    templateUrl: '/app/views/descriptions/edit.html',
    controller: 'descriptions.edit'
  });

  // project routes
  $routeProvider.when('/projects', {
    templateUrl: '/app/views/projects/index.html',
    controller: 'projects.index'
  });
  $routeProvider.when('/projects/new', {
    templateUrl: '/app/views/projects/new.html',
    controller: 'projects.new'
  });
  $routeProvider.when('/projects/:project', {
    templateUrl: '/app/views/projects/show.html',
    controller: 'projects.show'
  });
  $routeProvider.when('/projects/:project/edit', {
    templateUrl: '/app/views/projects/edit.html',
    controller: 'projects.edit'
  });

  // user routes
  $routeProvider.when('/users/:username', {
    templateUrl: '/app/views/users/edit.html',
    controller: 'users.edit'
  });

  // session routes
  $routeProvider.when('/sessions/new', {
    templateUrl: '/app/views/sessions/new.html',
    controller: 'sessions.new'
  });
  // $routeProvider.when('/users/sessions/destroy', {
  //   resolve: {
  //     response: ['Session', function (Session) {
  //       Session.destroy();
  //     }]
  //   }
  // });

  // default route
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);
