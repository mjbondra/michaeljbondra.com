'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.services.api', []);

/**
 * API Service
 *
 * @param {string} url - url of api resource
 * @param {string} method - http method to use
 * @return {promise} - a promise for the data returned by a given url
 */
app.factory('api', ['$http', function ($http) {
  return function (url, method, data) {
    var opts = {};
    opts.url = url || '/';
    opts.method = method || 'GET';
    opts.params = { _t: new Date().getTime() };
    if (data) opts.data = data;
    return $http(opts);
  };
}]);
