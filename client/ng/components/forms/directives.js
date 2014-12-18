'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.forms.directives', []);

/**
 * Form handler
 *
 * ex. <form name="formName" data-form-handler data-form-model="formModel" data-form-submit="Submit">
 *
 * @param {string} attributes.formModel - form model name
 * @param {object} scope.name           - form object
 * @param {object} scope.formModel      - form model object
 * @param {string} scope.formSubmit     - form submit label
 */
app.directive('formHandler', [
  'formModelReset',
  'formServerError',
  'formServerSuccess',
  'formValidationError',
  function (formModelReset, formServerError, formServerSuccess, formValidationError) {
    return {
      link: function (scope, element, attributes) {
        var initial = {}
          , modelName = attributes.formModel;

        scope.clearMessages = function () {
          scope.statusMessages = null;
        };
        scope.save = function () {
          scope.statusMessages = null;

          var form = scope.name
            , model = scope.formModel;

          var recaptchaId = (function (id) {
            return id;
          })(model.gRecaptchaId);

          if (!form.$valid) {
            scope.statusType = 'error';
            scope.statusMessages = formValidationError(modelName, form);
            return;
          }
          model.$save()
            .then(function (res) {
              scope.statusType = 'success';
              scope.statusMessages = formServerSuccess(res, form);
              scope.formModel = angular.copy(formModelReset(initial, recaptchaId));
            }).catch(function (res) {
              scope.statusType = 'error';
              scope.statusMessages = formServerError(res, form);
            });
        };

        element.ready(function () {
          initial = (function (model) {
            return angular.copy(model);
          })(scope.formModel);
        });
      },
      scope: {
        formModel: '=',
        formSubmit: '@',
        name: '='
      },
      templateUrl: '/ng/components/forms/show.html',
      transclude: true
    };
  }
]);
