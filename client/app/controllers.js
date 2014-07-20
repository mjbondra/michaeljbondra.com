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
    DESCRIPTION CONTROLLERS
\*------------------------------------*/

/**
 * Description index
 * ROUTE /#!/descriptions
 * TEMPLATE /app/views/descriptions/index.html
 */
app.controller('descriptions.index', ['$scope', 'Description', function ($scope, Description) {
  $scope.descriptions = Description.query();
}]);

/**
 * Description show
 * ROUTE /#!/descriptions/:description
 * TEMPLATE /app/views/descriptions/show.html
 */
app.controller('descriptions.show', ['$location', '$routeParams', '$scope', 'Description', function ($location, $routeParams, $scope, Description) {
  var description = $scope.description = Description.get({ description: $routeParams.description });
  description.$promise.catch(function (err) {
    $location.path('/descriptions');
  });
}]);

/**
 * Description new
 * ROUTE /#!/descriptions/new
 * TEMPLATE /app/views/descriptions/new.html
 */
app.controller('descriptions.new', ['$scope', 'Description', function ($scope, Description) {
  $scope.description = new Description();
}]);

/**
 * Description edit
 * ROUTE /#!/descriptions/:project/edit
 * TEMPLATE /app/views/descriptions/edit.html
 */
app.controller('descriptions.edit', ['$location', '$routeParams', '$scope', 'Description', function ($location, $routeParams, $scope, Description) {
  var description = $scope.description = Description.get({ description: $routeParams.description });
  description.$promise.catch(function (err) {
    $location.path('/descriptions');
  });
}]);

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
app.controller('projects.show', ['$location', '$routeParams', '$scope', 'Project', function ($location, $routeParams, $scope, Project) {
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
}]);

/**
 * Project edit
 * ROUTE /#!/projects/:project/edit
 * TEMPLATE /app/views/projects/edit.html
 */
app.controller('projects.edit', ['$location', '$routeParams', '$scope', 'Project', function ($location, $routeParams, $scope, Project) {
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
