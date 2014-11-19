'use strict';

var angular = require('angular')
, app = angular.module('mjbondra.components.head.services', []);

app.factory('title', function () {
  var title;
  return {
    get: function () {
      return title;
    },
    set: function (_title) {
      title = _title;
    }
  };
});
