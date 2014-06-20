'use strict';

var app = angular.module('mjbondra.services', ['ngResource']);

/*------------------------------------*\
    EXTERNAL LIBRARY SERVICES
\*------------------------------------*/

/**
 * Underscore service
 */
app.factory('_', function () {
  return require('underscore');
});

/*------------------------------------*\
    GENERAL UTILITY SERVICES
\*------------------------------------*/

/**
 * API Service
 *
 * @param {string} url - url without the '/api' prefix
 * @param {string} method - http method to use
 * @return {promise} - a promise for the data returned by a given url
 */
app.factory('api', ['$http', function ($http) {
  return function (url, method) {
    url = '/api' + url;
    method = method || 'GET';
    return $http({ method: method, url: url, params: { t: new Date().getTime() }});
  };
}]);

/**
 * Service that checks for the existence of nested keys
 *
 * source: http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-nested-object-key#2631198
 * usage: exists(object, 'key 1', 'key 2', ... 'key n')
 *
 * @param {object} argument[0] - object that will be checked for the presence of nested key-values
 * @param {string} argument[n] - name of potential nested key-value
 * @return {boolean} - whether or not a nested key-value exists in the object
 */
app.factory('exists', function () {
  return require('../../server/assets/lib/utilities/exists');
});

/**
 * <head> service
 *
 * Sets and provides values for <title> and <meta name="description">
 */
app.factory('head', function () {
  var description, title;
  return {
    getDescription: function () {
      return description;
    },
    getTitle: function () {
      return title;
    },
    setDescription: function (d) {
      description = d;
    },
    setTitle: function (t) {
      title = t;
    }
  };
});

/**
 * Service that detects high-resolution screens
 *
 * @return {boolean} - whether or not a screen is high density
 */
app.factory('highDpi', ['$window', function ($window) {
  var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.3),\
    (min--moz-device-pixel-ratio: 1.3),\
    (-o-min-device-pixel-ratio: 13/10),\
    (min-resolution: 1.3dppx)";
  return function () {
    if ($window.devicePixelRatio > 1.3) return true;
    if ($window.matchMedia && $window.matchMedia(mediaQuery).matches) return true;
    return false;
  };
}]);

/*------------------------------------*\
    RESOURCE SERVICES
\*------------------------------------*/

/**
 * Project service
 */
app.factory('Project', ['$resource', function ($resource) {
  return $resource('/api/projects/:project', {}, {
    save: { method: 'POST' },
    update: { method: 'PUT' }
  });
}]);

/**
 * User service
 */
app.factory('User', ['$resource', function ($resource) {
  return $resource('/api/users/:username', {}, {
    update: { method: 'PUT' }
  });
}]);

/**
 * Session service
 */
app.factory('Session', ['$resource', function ($resource) {
  return $resource('/api/sessions/:session', {}, {
    create: { method: 'POST' },
    destroy: { method: 'DELETE' }
  });
}]);

/*------------------------------------*\
    RESPONSE SERVICES
\*------------------------------------*/

app.config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
  $provide.factory('mjbondraInterceptor', ['$location', '$rootScope', '$q', '_', 'exists', function ($location, $rootScope, $q, _, exists) {
    var redirect = {
      methods: ['DELETE', 'POST', 'PUT'], // methods after which redirection should occur
      path: function (res) { // redirection function
        var path = res.config.url.replace(/\/*api/, '');
        var slug = exists(res, 'data', 'messages', 0, 'value', 'slug') ? res.data.messages[0].value.slug : '';
        if (!slug || !path) return; // do not redirect if slug or path is not present
        else switch (res.config.method) {
          case 'DELETE':
            path = String(path.match(/.*(?=\/)/)); // redirect to content type index
            break;
          case 'POST':
            path = path + '/' + slug; // redirect to created content
            break;
          case 'PUT':
            path = String(path.match(/.*\//)) + slug; // redirect to updated content
            break;
        }
        $location.path(path);
      }
    };
    return {
      response: function (res) {
        if (res.config && String(res.config.url).indexOf('/api') === 0 && _.indexOf(redirect.methods, res.config.method) > -1) redirect.path(res);
        return res || $q.when(res);
      },
      responseError: function (res) {
        return $q.reject(res);
      }
    };
  }]);
  $httpProvider.interceptors.push('mjbondraInterceptor');
}]);
