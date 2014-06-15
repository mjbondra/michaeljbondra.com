'use strict';

var app = angular.module('mjbondra.services', ['ngResource']);

/*------------------------------------*\
    EXTERNAL LIBRARY SERVICES
\*------------------------------------*/

/*------------------------------------*\
    ROOT SCOPE SERVICES
\*------------------------------------*/

app.factory('Head', ['$rootScope', function ($rootScope) {
  var description, title;
  $rootScope.getDescription = function () {
    return description;
  };
  $rootScope.getTitle = function () {
    return title;
  };
  return {
    setDescription: function (d) {
      description = d;
    },
    setTitle: function (t) {
      title = t;
    }
  };
}]);

/*------------------------------------*\
    GENERAL UTILITY SERVICES
\*------------------------------------*/

app.factory('Slug', [function () {
  return {
    create: function () {},
    get: function (res, index) {
      return res && res.data && res.data.messages && res.data.messages[index] && res.data.messages[index].value && res.data.messages[index].value.slug ? res.data.messages[index].value.slug : '';
    }
  };
}]);

/*------------------------------------*\
    RESOURCE SERVICES
\*------------------------------------*/

/**
 * Project service
 */
app.factory('Project', ['$resource', '$location', 'Slug', function ($resource, $location, Slug) {
  return $resource('api/projects/:project', {}, {
    save: {
      method:'POST',
      interceptor: {
        response: function (res) {
          var slug = Slug.get(res, 0);
          $location.path('/projects/' + slug);
        }
      }
    },
    update: {
      method:'PUT',
      interceptor: {
        response: function (res) {
          var slug = Slug.get(res, 0);
          $location.path('/projects/' + slug);
        }
      }
    }
  });
}]);

/*------------------------------------*\
    RESPONSE SERVICES
\*------------------------------------*/

// app.config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
//   $provide.factory('mjbondraInterceptor', ['$rootScope', '$q', function ($rootScope, $q) {
//     return {
//       response: function (res) {
//         return res || $q.when(res);
//       },
//       responseError: function (res) {
//         return $q.reject(res);
//       }
//     };
//   }]);
//   $httpProvider.interceptors.push('mjbondraInterceptor');
// }]);
