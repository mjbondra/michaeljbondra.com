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
app.controller('about', ['$scope', 'Head', function ($scope, Head) {
  Head.setDescription('Hello! I am Michael J. Bondra, a full-stack web developer based in Ann Arbor.');
  Head.setTitle('About');
}]);

/**
 * Contact
 * ROUTE /#!/contact
 * TEMPLATE /app/views/contact/index.html
 */
app.controller('contact', ['$scope', 'Head', function ($scope, Head) {
  Head.setDescription('Contact me. Let\'s collaborate on your next project.');
  Head.setTitle('Contact');
}]);

/**
 * Home
 * ROUTE /#!/
 * TEMPLATE /app/views/index.html
 */
app.controller('home', ['$scope', 'Head', function ($scope, Head) {
  Head.setDescription('Hello! I am Michael J. Bondra, a full-stack web developer based in Ann Arbor.');
  Head.setTitle('Home');
}]);

/*------------------------------------*\
    PROJECT CONTROLLERS
\*------------------------------------*/

/**
 * Project index
 * ROUTE /#!/projects
 * TEMPLATE /app/views/projects/index.html
 */
app.controller('projects.index', ['$scope', 'Head', 'Project', function ($scope, Head, Project) {
  Head.setDescription('Here are some highlights of the work that I\'ve done');
  Head.setTitle('Project');
  $scope.projects = Project.query();
}]);

/**
 * Project show
 * ROUTE /#!/projects/:project
 * TEMPLATE /app/views/projects/show.html
 */
app.controller('projects.show', ['$location', '$scope', '$routeParams', 'Head', 'Project', function ($location, $scope, $routeParams, Head, Project) {
  var project = $scope.project = Project.get({ project: $routeParams.project });
  project.$promise.then(function (project) {
    Head.setDescription(project.body);
    Head.setTitle(project.title);
  }).catch(function (err) {
    $location.path('/projects');
  });
}]);

/**
 * Project new
 * ROUTE /#!/projects/new
 * TEMPLATE /app/views/projects/new.html
 */
app.controller('projects.new', ['$scope', 'Head', 'Project', function ($scope, Head, Project) {
  Head.setDescription('Create a new project.');
  Head.setTitle('New Project');
  $scope.project = new Project();
  $scope.project.tags = [];
}]);

/**
 * Project edit
 * ROUTE /#!/projects/:project/edit
 * TEMPLATE /app/views/projects/edit.html
 */
app.controller('projects.edit', ['$location', '$scope', '$routeParams', 'Head', 'Project', function ($location, $scope, $routeParams, Head, Project) {
  var project = $scope.project = Project.get({ project: $routeParams.project });
  project.$promise.then(function (project) {
    Head.setDescription('Edit' + project.title);
    Head.setTitle('Edit' + project.title);
  }).catch(function (err) {
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
app.controller('users.edit', ['$scope', 'Head', function ($scope, Head) {
  Head.setDescription('User edit');
  Head.setTitle('User edit');
}]);

/**
 * User session new
 * ROUTE /#!/users
 * TEMPLATE /app/views/users/sessions/new.html
 */
app.controller('users.sessions.new', ['$scope', 'Head', function ($scope, Head) {
  Head.setDescription('User edit');
  Head.setTitle('User edit');
}]);
