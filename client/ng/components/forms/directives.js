'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.forms.directives', []);

/**
 * Form handler
 *
 * ex. <form name="formName" data-form-handler="formModel">
 *
 * @param {string} attributes.name        - form name
 * @param {string} attributes.formHandler - form model
 */
app.directive('formHandler', [
  'formServerError',
  'formServerSuccess',
  'formValidationError',
  function (formServerError, formServerSuccess, formValidationError) {
    return {
      link: function (scope, element, attributes) {
        var form = scope[attributes.name]
          , model = scope[attributes.formHandler];

        scope.save = function () {
          if (!form.$valid) return formValidationError(form);
          model.$save()
            .then(function (res) {
              formServerSuccess(res);
              form.$setPristine();
            }).catch(function (err) {
              formServerError(err);
            });
        };
      }
    };
  }
]);
