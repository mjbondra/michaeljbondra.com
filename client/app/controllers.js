'use strict';

var app = angular.module('mjbondra.controllers', []);

/**
 * About
 * ROUTE /#!/about
 * TEMPLATE /app/views/about/index.html
 */
app.controller('about', ['$scope', 'Head', function ($scope, Head) {
  Head.setDescription('I am Michael J. Bondra, a full-stack web developer based in Ann Arbor.');
  Head.setTitle('About');
}]);

/**
 * Contact
 * ROUTE /#!/contact
 * TEMPLATE /app/views/contact/index.html
 */
app.controller('contact', ['$scope', 'Head', function ($scope, Head) {
  Head.setDescription('Let\'s talk about your next project.');
  Head.setTitle('Contact');
}]);

/**
 * Work index
 * ROUTE /#!/work
 * TEMPLATE /app/views/work/index.html
 */
app.controller('work.index', ['$scope', 'Head', function ($scope, Head) {}]);

/**
 * Work show
 * ROUTE /#!/work/:work
 * TEMPLATE /app/views/work/show.html
 */
app.controller('work.show', ['$scope', 'Head', function ($scope, Head) {}]);

/**
 * Work navigation
 * TEMPLATE /app/views/work/navigation.html
 */
app.controller('work.navigation', ['$scope', function ($scope) {}]);
