'use strict';

var app = angular.module('mjbondra.services', ['ngResource']);

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
    RESOURCE SERVICES
\*------------------------------------*/

/**
 * Project service
 */
app.factory('Project', ['$resource', '$location', function ($resource, $location) {
  return $resource('api/projects/:project', {}, {
    save: {
      method:'POST',
      interceptor: {
        response: function (res) {
          var slug = res && res.data && res.data.messages && res.data.messages[0] && res.data.messages[0].value && res.data.messages[0].value.slug ? res.data.messages[0].value.slug : '';
          $location.path('/projects/' + slug);
        }
      }
    },
    update: {
      method:'PUT',
      interceptor: {
        response: function (res) {
          var slug = res && res.data && res.data.messages && res.data.messages[0] && res.data.messages[0].value && res.data.messages[0].value.slug ? res.data.messages[0].value.slug : '';
          $location.path('/projects/' + slug);
        }
      }
    }
  });
}]);
