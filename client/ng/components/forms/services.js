'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.forms.services', [])
  , msg = require('../../../../shared/messages').validation;

app.factory('formServerError', [function () {
  return function (res, form) {
    var data = res.data || {}
      , errors = data.errors || [];

    for (var i = 0; i < errors.length; i++) {
      if (form[errors[i].field]) {
        form[errors[i].field].$setViewValue(form[errors[i].field].$viewValue || ''); // set dirty
        form[errors[i].field].$setValidity(errors[i].field, false);
      }
    }

    return errors.length ? errors : [data];
  };
}]);

app.factory('formValidationError', [function () {
  var getMessage = function (modelName, field, type) {
    var fieldName = field.$name || 'field';
    if (msg[modelName] && msg[modelName][fieldName] && typeof msg[modelName][fieldName][type] === 'string')
      return msg[modelName][fieldName][type];
    else if (msg[fieldName] && typeof msg[fieldName][type] === 'string')
      return msg[fieldName][type];
    else if (typeof msg[type] === 'string')
      return msg[type];
    return fieldName + ' is invalid';
  };

  return function (modelName, form) {
    var errors = form.$error
      , keys = Object.keys(errors)
      , messages = [];

    for (var i = 0; i < keys.length; i++) {
      for (var k = 0; k < errors[keys[i]].length; k++) {
        errors[keys[i]][k].$setViewValue(errors[keys[i]][k].$viewValue || ''); // set dirty
        messages.push({
          msg: getMessage(modelName, errors[keys[i]][k], keys[i])
        });
      }
    }

    return messages;
  };
}]);
