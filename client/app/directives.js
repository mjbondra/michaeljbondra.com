'use strict';

var app = angular.module('mjbondra.directives', ['angularFileUpload']);

/*------------------------------------*\
    FORM FIELD DIRECTIVES
\*------------------------------------*/

/**
 * Add field
 *
 * @param {string} attribute.addField - array in parent scope upon which additional objects may be added
 */
app.directive('addField', function () {
  return {
    scope: {
      addField: '='
    },
    link: function (scope, element, attributes) {
      element.ready(function () {
        element.on('click', function () {
          scope.addField.push({});
          scope.$apply();
        });
        scope.$on('$destroy', function () {
          element.off('click');
        });
      });
    }
  };
});

/**
 * Remove field
 *
 * @param {number} attribute.index - index of value to remove in parent scope array
 * @param {string} attribute.removeField - array in parent scope upon which objects may be removed
 */
app.directive('removeField', function () {
  return {
    scope: {
      removeField: '='
    },
    link: function (scope, element, attributes) {
      element.ready(function () {
        if (!attributes.index) return;
        element.on('click', function () {
          scope.removeField.splice(attributes.index, 1);
          scope.$apply();
        });
        scope.$on('$destroy', function () {
          element.off('click');
        });
      });
    }
  };
});

/**
 * Upload field
 *
 * @param {function} attribute.ngFileSelect - upload function (set to 'onFileSelect($files)' for default behavior)
 * @param {string} attribute.uploadField - url of upload path
 */
app.directive('uploadField', ['$upload', function ($upload) {
  return {
    scope: true,
    link: function (scope, element, attributes) {
      scope.onFileSelect = function ($files) {
        for (var i = 0; i < $files.length; i++) {
          var file = $files[i];
          scope.upload = $upload.upload({
            url: attributes.uploadField,
            file: file,
            fileFormDataName: 'image',
          }).progress(function (evt) {
            // $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
          }).success(function (data, status, headers, config) {
            // success action
          });
        }
      };
    }
  };
}]);
