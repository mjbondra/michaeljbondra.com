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
    SNIPPET CONTROLLERS
\*------------------------------------*/

/**
 * Snippet index
 * ROUTE /#!/snippets
 * TEMPLATE /app/views/snippets/index.html
 */
app.controller('snippets.index', ['$scope', 'Snippet', function ($scope, Snippet) {
  $scope.snippets = Snippet.query();
}]);

/**
 * Snippet show
 * ROUTE /#!/snippets/:snippet
 * TEMPLATE /app/views/snippets/show.html
 */
app.controller('snippets.show', ['$location', '$routeParams', '$scope', 'Snippet', function ($location, $routeParams, $scope, Snippet) {
  var snippet = $scope.snippet = Snippet.get({ snippet: $routeParams.snippet });
  snippet.$promise.catch(function (err) {
    $location.path('/snippets');
  });
}]);

/**
 * Snippet new
 * ROUTE /#!/snippets/new
 * TEMPLATE /app/views/snippets/new.html
 */
app.controller('snippets.new', ['$scope', 'Snippet', function ($scope, Snippet) {
  $scope.snippet = new Snippet();
}]);

/**
 * Snippet edit
 * ROUTE /#!/snippets/:snippet/edit
 * TEMPLATE /app/views/snippets/edit.html
 */
app.controller('snippets.edit', ['$location', '$routeParams', '$scope', 'Snippet', function ($location, $routeParams, $scope, Snippet) {
  var snippet = $scope.snippet = Snippet.get({ snippet: $routeParams.snippet });
  snippet.$promise.catch(function (err) {
    $location.path('/snippets');
  });
}]);

/*------------------------------------*\
    USER/SESSION CONTROLLERS
\*------------------------------------*/

app.controller('users.index', ['$scope', function ($scope) {}]);
app.controller('users.show', ['$scope', function ($scope) {}]);

/**
 * User new
 * ROUTE /#!/users/:username/edit
 * TEMPLATE /app/views/users/new.html
 */
app.controller('users.new', ['$scope', 'User', function ($scope, User) {
  $scope.user = new User();
}]);

/**
 * User edit
 * ROUTE /#!/users/:username/edit
 * TEMPLATE /app/views/users/edit.html
 */
app.controller('users.edit', ['$scope', function ($scope) {}]);

/**
 * User session new
 * ROUTE /#!/users
 * TEMPLATE /app/views/sessions/new.html
 */
app.controller('sessions.new', ['$scope', 'Session', function ($scope, Session) {
  $scope.session = new Session();
}]);
