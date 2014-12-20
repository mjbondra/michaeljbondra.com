'use strict';

var angular = require('angular')
  , app = angular.module('headServices', []);

app.factory('description', [function () {
  var description;
  return {
    get: function () {
      return description;
    },
    set: function (_description) {
      description = _description;
    }
  };
}]);

app.factory('title', [function () {
  var title;
  return {
    get: function () {
      return title;
    },
    set: function (_title) {
      title = _title;
    }
  };
}]);
