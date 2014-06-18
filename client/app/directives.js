'use strict';

var app = angular.module('mjbondra.directives', ['angularFileUpload']);

/*------------------------------------*\
    HEAD DIRECTIVES
\*------------------------------------*/

/**
 * Description directive
 *
 * Sets and populates "content" attribute of <meta name="description">
 *
 * set: <p data-description>...</p>
 * get: <meta name="description" data-description data-ng-attr-content="{{ getDescription() }}">
 */
app.directive('description', ['Head', function (Head) {
  return {
    link: function (scope, element, attributes) {
      var tagName = element.prop('tagName');
      if (tagName && String(tagName).toLowerCase() !== 'meta') element.ready(function () {
        Head.setDescription(element.text());
        scope.$apply();
      });
      else scope.getDescription = function () {
        return Head.getDescription();
      };
    },
    scope: true
  };
}]);


/**
 * Title directive
 *
 * Sets and populates <title>
 *
 * set: <h2 data-title>...</h2>
 * get: <title data-ng-bind="getTitle()" data-title></title>
 */
app.directive('title', ['Head', function (Head) {
  return {
    link: function (scope, element, attributes) {
      var tagName = element.prop('tagName');
      if (tagName && String(tagName).toLowerCase() !== 'title') element.ready(function () {
        Head.setTitle(element.text());
        scope.$apply();
      });
      else scope.getTitle = function () {
        return Head.getTitle();
      };
    },
    scope: true
  };
}]);

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
    link: function (scope, element, attributes) {
      element.ready(function () {
        if (!scope.addField) scope.addField = [];
        element.on('click', function () {
          scope.addField.push({});
          scope.$apply();
        });
        scope.$on('$destroy', function () {
          element.off('click');
        });
      });
    },
    scope: {
      addField: '='
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
    },
    scope: {
      removeField: '='
    }
  };
});

/**
 * Image fieldset
 *
 * @param {string} attribute.imageFieldset - url of upload path
 */
app.directive('imageFieldset', ['$upload', function ($upload) {
  return {
    link: function (scope, element, attributes) {
      scope.onFileSelect = function ($files) {
        for (var i = 0; i < $files.length; i++) {
          var file = $files[i];
          scope.upload = $upload.upload({
            url: attributes.imageFieldset,
            file: file,
            fileFormDataName: 'image',
          }).progress(function (evt) {
            // $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
          }).success(function (data, status, headers, config) {
            // success action
          });
        }
      };
    },
    scope: true,
    templateUrl: '/app/views/directives/image-fieldset.html'
  };
}]);
