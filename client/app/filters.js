'use strict';

var app = angular.module('mjbondra.filters', []);

/**
 * Format title
 */
app.filter('pageTitle', function () {
  return function (input) {
    var globalTitle = 'Michael J. Bondra';
    return ( input ? input + ' | ' : '' ) + globalTitle;
  };
});

/**
 * Summarize filter
 */
app.filter('summarize', function () {
  return function (input, maxLength) {
    input = input || '';
    maxLength = maxLength || 160;
    if (input.length <= maxLength) return input;
    input = String(input).substring(0, maxLength);
    var output = String(input).match(/.*[\.\?\!]/);
    if (output && output[0]) return output[0];
    return input;
  };
});
