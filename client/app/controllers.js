'use strict';

var app = angular.module('mjbondra.controllers', []);

/*------------------------------------*\
    STATIC PAGE CONTROLLERS
\*------------------------------------*/

/**
 * About
 * ROUTE /#!/about
 * TEMPLATE /app/views/about/index.html
 */
app.controller('about', function () {});

/**
 * Contact
 * ROUTE /#!/contact
 * TEMPLATE /app/views/contact/index.html
 */
app.controller('contact', function () {});

/**
 * Home
 * ROUTE /#!/
 * TEMPLATE /app/views/index.html
 */
app.controller('home', function () {});

/*------------------------------------*\
    PROJECT CONTROLLERS
\*------------------------------------*/

/**
 * Project index
 * ROUTE /#!/projects
 * TEMPLATE /app/views/projects/index.html
 */
app.controller('projects.index', ['$scope', 'Project', function ($scope, Project) {
  $scope.projects = Project.query();
}]);

/**
 * Project show
 * ROUTE /#!/projects/:project
 * TEMPLATE /app/views/projects/show.html
 */
app.controller('projects.show', ['$location', '$scope', '$routeParams', 'Project', function ($location, $scope, $routeParams, Project) {
  var project = $scope.project = Project.get({ project: $routeParams.project });
  project.$promise.catch(function (err) {
    $location.path('/projects');
  });
}]);

/**
 * Project new
 * ROUTE /#!/projects/new
 * TEMPLATE /app/views/projects/new.html
 */
app.controller('projects.new', ['$scope', 'Project', function ($scope, Project) {
  $scope.project = new Project();
  $scope.project.tags = [];
}]);

/**
 * Project edit
 * ROUTE /#!/projects/:project/edit
 * TEMPLATE /app/views/projects/edit.html
 */
app.controller('projects.edit', ['$location', '$scope', '$routeParams', 'Project', function ($location, $scope, $routeParams, Project) {
  var project = $scope.project = Project.get({ project: $routeParams.project });
  project.$promise.catch(function (err) {
    $location.path('/projects');
  });
}]);

/*------------------------------------*\
    USER/SESSION CONTROLLERS
\*------------------------------------*/

/**
 * User edit
 * ROUTE /#!/users/:username/edit
 * TEMPLATE /app/views/users/edit.html
 */
app.controller('users.edit', ['$scope', function ($scope) {}]);

/**
 * User session new
 * ROUTE /#!/users
 * TEMPLATE /app/views/users/sessions/new.html
 */
app.controller('sessions.new', ['$scope', function ($scope) {}]);
