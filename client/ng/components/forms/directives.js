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
  'formModelReset',
  'formServerError',
  'formServerSuccess',
  'formValidationError',
  function (formModelReset, formServerError, formServerSuccess, formValidationError) {
    return {
      link: function (scope, element, attributes) {
        var form = scope[attributes.name]
          , modelName = attributes.formHandler
          , model = scope[modelName];

        scope.clearMessages = function () {
          scope.messages = null;
        };
        scope.save = function () {
          scope.messages = null;
          var recaptchaId = (function (id) {
            return id;
          })(model.gRecaptchaId);

          if (!form.$valid) {
            scope.messagesType = 'error';
            scope.messages = formValidationError(modelName, form);
            return;
          }
          model.$save()
            .then(function (res) {
              scope.messagesType = 'success';
              scope.messages = formServerSuccess(res, form);
              scope[modelName] = formModelReset(model, recaptchaId);
            }).catch(function (res) {
              scope.messagesType = 'error';
              scope.messages = formServerError(res, form);
            });
        };
      },
      templateUrl: '/ng/components/forms/show.html',
      transclude: true
    };
  }
]);
