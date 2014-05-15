'use strict';

var app = angular.module('mjbondra.controllers', []);

/**
 * Home
 * TEMPLATE /app/views/home.html
 */
app.controller('home', ['$scope', 'Head', function ($scope, Head) {
  Head.setDescription('I am a full-stack web developer based in Ann Arbor.');
  Head.setTitle('Michael J. Bondra');
}]);

/**
 * About
 * TEMPLATE /app/views/about.html
 */
app.controller('about', ['$scope', function ($scope) {}]);

/**
 * Projects
 * TEMPLATE /app/views/projects/index.html
 */
app.controller('projects.index', ['$scope', 'Head', function ($scope, Head) {
  Head.setDescription('Here are some of my favorite projects.');
  Head.setTitle('Projects');
}]);

/**
 * Contact
 * TEMPLATE /app/views/contact.html
 */
app.controller('contact', ['$scope', function ($scope) {}]);
