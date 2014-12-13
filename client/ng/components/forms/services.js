'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.forms.services', []);

app.factory('formServerError', [function () {
  return function (res, form) {
    var data = res.data
      , errors = data.errors || [];

    for (var i = 0; i < errors.length; i++) {
      if (form[errors[i].field]) {
        form[errors[i].field].$setViewValue(form[errors[i].field].$viewValue || ''); // set dirty
        form[errors[i].field].$setValidity(errors[i].field, false);
      }
    }

    return errors;
  };
}]);

app.factory('formValidationError', [function () {
  var errorMessages = {
    defaultAction: function (model) {
      return 'There was an error while validating \'' + model.$name + '\'';
    },
    email: function (model) {
      return '\'' + model.$name + '\' must contain a valid email address';
    },
    required: function (model) {
      return '\'' + model.$name + '\' cannot be empty';
    }
  };

  return function (form) {
    var errors = form.$error
      , keys = Object.keys(errors)
      , messages = [];

    for (var i = 0; i < keys.length; i++) {
      for (var k = 0; k < errors[keys[i]].length; k++) {
        errors[keys[i]][k].$setViewValue(errors[keys[i]][k].$viewValue || ''); // set dirty
        messages.push({
          msg: errorMessages[errorMessages[keys[i]] ? keys[i] : 'defaultAction'](errors[keys[i]][k])
        });
      }
    }

    return messages;
  };
}]);
