'use strict';

var app = angular.module('mjbondra.services.api', []);

/**
 * API Service
 *
 * @param {string} url - url of api resource
 * @param {string} method - http method to use
 * @return {promise} - a promise for the data returned by a given url
 */
app.factory('api', ['$http', function ($http) {
  return function (url, method) {
    method = method || 'GET';
    return $http({ method: method, url: url, params: { t: new Date().getTime() }});
  };
}]);
