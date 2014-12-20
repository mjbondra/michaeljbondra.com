'use strict';

var angular = require('angular')
  , app = angular.module('googleRecaptchaDirectives', []);

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
  'recaptchaReset',
  'recaptchaSiteKey',
  function ($window, grecaptcha, recaptchaReset, recaptchaSiteKey) {
    return {
      link: function (scope, element) {
        var id;

        var classes = element.attr('class').split(' ');
        classes.push('google-recaptcha');
        element.attr('class', classes.join(' '));

        function getRecaptchaResponse (res) {
          scope.$apply(function () {
            scope.recaptchaParent.gRecaptchaResponse = res;
          });
          removeRecaptchaDataElements();
        }

        function removeRecaptchaDataElements () {
          var dataClass = 'pls-container'
            , dataElement = angular.element(document.getElementsByClassName ?
                document.getElementsByClassName(dataClass) :
                document.querySelectorAll('.' + dataClass))
            , dataParent = dataElement.parent()
            , dataParentSibling = dataParent.next();

          if (dataParentSibling.prop('tagName') === 'INS') dataParentSibling.remove();

          if (dataParent.children().length === 1) dataParent.remove();
          else dataElement.remove();
        }

        function renderRecaptcha () {
          if (grecaptcha.render) {
            id = scope.recaptchaParent.gRecaptchaId = grecaptcha.render(element.children()[0], {
              callback: getRecaptchaResponse,
              sitekey: recaptchaSiteKey.get(),
              theme: 'dark'
            });
          } else $window.loadRecaptcha = function () {
            renderRecaptcha();
          };
        }

        scope.$on('$destroy', function(){
          recaptchaReset(id);
        });

        renderRecaptcha();
      },
      scope: {
        recaptchaParent: '='
      },
      templateUrl: '/ng/components/google-recaptcha/show.html',
    };
  }
]);
