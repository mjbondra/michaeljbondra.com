'use strict';

var app = angular.module('mjbondra.services', []);

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