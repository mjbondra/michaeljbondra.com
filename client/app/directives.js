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
app.directive('description', ['head', function (head) {
  return {
    link: function (scope, element, attributes) {
      var tagName = element.prop('tagName');
      if (tagName && String(tagName).toLowerCase() !== 'meta') element.ready(function () {
        head.setDescription(element.text());
        scope.$apply();
      });
      else scope.getDescription = function () {
        return head.getDescription();
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
app.directive('title', ['head', function (head) {
  return {
    link: function (scope, element, attributes) {
      var tagName = element.prop('tagName');
      if (tagName && String(tagName).toLowerCase() !== 'title') element.ready(function () {
        head.setTitle(element.text());
        scope.$apply();
      });
      else scope.getTitle = function () {
        return head.getTitle();
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
 * @param {array} attributes.addField - array in parent scope upon which additional objects may be added
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
 * @param {number} attributes.index - index of value to remove in parent scope array
 * @param {array} attributes.removeField - array in parent scope upon which objects may be removed
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

/*------------------------------------*\
    IMAGE DIRECTIVES
\*------------------------------------*/

/**
 * Image fieldset
 *
 * @param {array} attributes.imageFieldset - array in parent scope that contains images
 * @param {number} attributes.imageHeight - height of images that should be returned
 * @param {number} attributes.imageWidth - width of images that should be returned
 * @param {boolean} [attributes.imageHighDpi=true] - will double the value of height and width if screen is high-resolution
 * @param {array} attributes.uploadPath - url of upload path
 */
app.directive('imageFieldset', ['$upload', 'api', function ($upload, api) {
  return {
    link: function (scope, element, attributes) {
      var count = -1;
      scope.opts = {
        height: attributes.imageHeight,
        highDpi: attributes.imageHighDpi,
        multiple: attributes.imageMultiple,
        width: attributes.imageWidth
      };
      scope.alt = function (alt, id) {
        var i = scope.imageFieldset.length;
        while (i--) if (scope.imageFieldset[i]._id === id || scope.imageFieldset[i].related === id) scope.imageFieldset[i].alt = alt;
        return alt;
      };
      scope.delete = function (id) {
        api(attributes.uploadPath + '/' + id, 'DELETE').success(function (images) {
          scope.imageFieldset = images;
        });
      };
      scope.moveDown = function (index, id) {
        var i = scope.imageFieldset.length;
        while (i--) {
          if (scope.imageFieldset[i]._id === id || scope.imageFieldset[i].related === id) scope.imageFieldset[i].order += 1.5;
        }
      };
      scope.moveUp = function (index, id) {
        var i = scope.imageFieldset.length;
        while (i--) {
          if (scope.imageFieldset[i]._id === id || scope.imageFieldset[i].related === id) scope.imageFieldset[i].order -= 1.5;
        }
      };
      scope.order = function (index, id) {
        if (index > count) count = index;
        var i = scope.imageFieldset.length;
        while (i--) if (scope.imageFieldset[i]._id === id || scope.imageFieldset[i].related === id) scope.imageFieldset[i].order = index;
        return index;
      };
      scope.save = scope.update = function ($files, opts) {
        if (!attributes.uploadPath) return;
        opts = opts || {};
        for (var i = 0; i < $files.length; i++) {
          var file = $files[i];
          scope.upload = $upload.upload({
            data: {
              alt: opts.alt || attributes.imageAlt || 'image',
              order: opts.order || count + 1
            },
            method: opts.method || 'POST',
            url: attributes.uploadPath + ( opts.id ? '/' + opts.id : '' ),
            file: file,
            fileFormDataName: 'image',
       // }).progress(function (evt) {
       //   $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
          }).success(function (images, status, headers, config) {
            scope.imageFieldset = images;
          });
        }
      };
    },
    scope: {
      imageFieldset: '='
    },
    templateUrl: '/app/views/directives/image-fieldset.html'
  };
}]);
