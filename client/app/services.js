'use strict';

var app = angular.module('mjbondra.services', ['ngResource']);

/*------------------------------------*\
    EXTERNAL LIBRARY SERVICES
\*------------------------------------*/

app.factory('_', function () {
  return require('underscore');
});

/*------------------------------------*\
    ROOT SCOPE SERVICES
\*------------------------------------*/

app.factory('Head', function () {
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

/*------------------------------------*\
    GENERAL UTILITY SERVICES
\*------------------------------------*/

/**
 * Service that checks for the existence of nested keys
 *
 * source: http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-nested-object-key#2631198
 * usage: exists(object, 'key 1', 'key 2', ... 'key n')
 */
app.factory('exists', function () {
  return require('../../server/assets/lib/utilities/exists');
});

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
        if (!slug || !path) path = '/'; // redirect to root if other redirect data does not exist
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
