'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.forms.services', [])
  , msg = require('../../../../shared/messages').validation;

/**
 * Form model reset
 *
 * @param  {object} model          - form model
 * @param  {number} [gRecaptchaId] - Google Recaptcha ID
 * @return {object}                - reset form model
 */
app.factory('formModelReset', [
  'recaptchaReset',
  function (recaptchaReset) {
    return function (model, recaptchaId) {
      model = {};
      if (typeof recaptchaId !== 'undefined') {
        recaptchaReset(recaptchaId);
        model.recaptchaId = recaptchaId;
      }
      return model;
    };
  }
]);

/**
 * Form server error
 *
 * @param  {object} res  - raw response object
 * @param  {object} form - form scope object
 * @return {array}       - array of message-containing objects
 */
app.factory('formServerError', [function () {
  return function (res, form) {
    var data = typeof res.data === 'object' ? res.data : {
      msg: 'I\'m sorry, there was an error while processing your form submisson. Please try again.'
    }, errors = data.errors || [];

    for (var i = 0; i < errors.length; i++) {
      if (form[errors[i].field]) {
        form[errors[i].field].$setViewValue(form[errors[i].field].$viewValue || ''); // set dirty
        form[errors[i].field].$setValidity(errors[i].field, false);
      }
    }

    return errors.length ? errors : [data];
  };
}]);

/**
 * Form server success
 *
 * @param  {object} res            - raw response object
 * @param  {object} form           - form scope object
 * @return {array}                 - array of message-containing objects
 */
app.factory('formServerSuccess', [function () {
  return function (res, form) {
    form.$setPristine();
    return [res];
  };
}]);

/**
 * Form validation error
 *
 * @param  {string} modelName - name of parameter-containing model
 * @param  {object} form      - form scope object
 * @return {array}            - array of message-containing objects
 */
app.factory('formValidationError', [function () {
  function getMessage (modelName, field, type) {
    var fieldName = field.$name || 'field';
    if (msg[modelName] && msg[modelName][fieldName] && typeof msg[modelName][fieldName][type] === 'string')
      return msg[modelName][fieldName][type];
    else if (msg[fieldName] && typeof msg[fieldName][type] === 'string')
      return msg[fieldName][type];
    else if (typeof msg[type] === 'string')
      return msg[type];
    return fieldName + ' is invalid';
  }

  return function (modelName, form) {
    var errors = form.$error
      , messages = [];

    angular.forEach(errors, function (fieldErrors, type) {
      for (var i = 0; i < fieldErrors.length; i++) {
        if (fieldErrors[i].$setViewValue)
          fieldErrors[i].$setViewValue(fieldErrors[i].$viewValue || '');
        messages.push({
          msg: getMessage(modelName, fieldErrors[i], type)
        });
      }
    });

    return messages;
  };
}]);
