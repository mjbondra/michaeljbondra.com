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
  'formValidationError',
  function (formServerError, formValidationError) {
    return {
      link: function (scope, element, attributes) {
        var form = scope[attributes.name]
          , model = scope[attributes.formHandler];

        scope.clearMessages = function () {
          scope.messages = null;
        };
        scope.save = function () {
          if (!form.$valid) {
            scope.messages = formValidationError(form);
            return;
          }
          model.$save()
            .then(function (res) {
              scope.messages = [res];
              form.$setPristine();
            }).catch(function (res) {
              scope.messages = formServerError(res, form);
            });
        };
      },
      templateUrl: '/ng/components/forms/show.html',
      transclude: true
    };
  }
]);
