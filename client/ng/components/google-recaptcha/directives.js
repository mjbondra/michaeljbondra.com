'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.google-recaptcha.directives', []);

app.directive('googleRecaptcha', [
  'recaptchaSiteKey',
  function (recaptchaSiteKey) {
    return {
      link: function (scope, element, attributes) {
        recaptchaSiteKey.set(attributes.googleRecaptcha);
      }
    };
  }
]);

app.directive('recaptchaRender', [
  '$window',
  'grecaptcha',
  'recaptchaSiteKey',
  function ($window, grecaptcha, recaptchaSiteKey) {
    return {
      link: function (scope, element) {
        var id;

        function getRecaptchaResponse (res) {
          scope.$apply(function () {
            scope.recaptchaModel = res;
          });
        }

        function renderRecaptcha () {
          if (grecaptcha.render) {
            id = scope.recaptchaId = grecaptcha.render(element[0], {
              callback: getRecaptchaResponse,
              sitekey: recaptchaSiteKey.get(),
              theme: 'dark'
            });
          } else $window.loadRecaptcha = function () {
            renderRecaptcha();
          };
        }

        function resetRecaptcha (id) {
          grecaptcha.reset(id);
        }

        scope.$on('$destroy', function(){
          resetRecaptcha(id);
        });

        renderRecaptcha();
      },
      scope: {
        recaptchaId: '=',
        recaptchaModel: '='
      }
    };
  }
]);
