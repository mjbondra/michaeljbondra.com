'use strict';

var app = angular.module('mjbondra.routes', []);

/**
 * Routes
 */
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  // home

  // static page routes
  $routeProvider.when('/about', {
    templateUrl: '/app/views/about/index.html',
    controller: 'about'
  });
  $routeProvider.when('/contact', {
    templateUrl: '/app/views/contact/index.html',
    controller: 'contact'
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

  // user/session routes
  $routeProvider.when('/users/:username', {
    templateUrl: '/app/views/users/edit.html',
    controller: 'users.edit'
  });
  $routeProvider.when('/users/sessions/new', {
    templateUrl: '/app/views/users/sessions/new.html',
    controller: 'users.sessions.new'
  });
  // $routeProvider.when('/users/sessions/destroy', {
  //   resolve: {
  //     response: ['User', function (User) {
  //       User.signOut();
  //     }]
  //   }
  // });

  // default route
  $routeProvider.otherwise({
    redirectTo: '/about'
  });
}]);
