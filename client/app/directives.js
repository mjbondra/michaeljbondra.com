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

app.directive('elementEditable', function () {
  return {
    link: function (scope, element, attributes) {
      var clear = scope.clear = function () {};
      var save = scope.save = function () {};
    },
    scope: {
      elementEditable: '='
    }
  };
});

/**
 * Add field
 *
 * @param {array} attributes.fieldAdd - array in parent scope upon which additional objects may be added
 */
app.directive('fieldAdd', function () {
  return {
    link: function (scope, element, attributes) {
      element.ready(function () {
        if (!scope.fieldAdd) scope.fieldAdd = [];
        element.on('click', function () {
          scope.fieldAdd.push({});
          scope.$apply();
        });
        scope.$on('$destroy', function () {
          element.off('click');
        });
      });
    },
    scope: {
      fieldAdd: '='
    }
  };
});

/**
 * Move field
 *
 * @param {number} attributes.fieldOrder - value in scope by which object in array is ordered
 * @param {string} attributes.fieldMove - '+' or '-' for positive or negative math upon order value
 */
app.directive('fieldMove', function () {
  return {
    link: function (scope, element, attributes) {
      if (!attributes.fieldMove) return;
      var move = attributes.fieldMove === '-' ? -1.5 : 1.5;
      element.ready(function () {
        element.on('click', function () {
          if (typeof scope.fieldOrder === 'undefined') return;
          scope.fieldOrder += move;
          scope.$apply();
        });
        scope.$on('$destroy', function () {
          element.off('click');
        });
      });
    },
    scope: {
      fieldOrder: '=',
      text: '@'
    },
    template: '{{ text }}'
  };
});

/**
 * Remove field
 *
 * @param {number} attributes.index - index of value to remove in parent scope array
 * @param {array} attributes.fieldRemove - array in parent scope upon which objects may be removed
 */
app.directive('fieldRemove', function () {
  return {
    link: function (scope, element, attributes) {
      element.ready(function () {
        if (!attributes.index) return;
        element.on('click', function () {
          scope.fieldRemove.splice(attributes.index, 1);
          scope.$apply();
        });
        scope.$on('$destroy', function () {
          element.off('click');
        });
      });
    },
    scope: {
      fieldRemove: '='
    }
  };
});

/*------------------------------------*\
    IMAGE DIRECTIVES
\*------------------------------------*/

app.directive('imageDelete', ['api', 'exists', function (api, exists) {
  return {
    link: function (scope, element, attributes) {
      element.ready(function () {
        element.on('click', function () {
          if (!attributes.imageDelete) return;
          api(attributes.imageDelete, 'DELETE').success(function (data) {
            if (!exists(data, 'messages', 0, 'value')) return;
            var index = -1
              , image = data.messages[0].value
              , i = scope.imageArray.length;
            while (i--) if (scope.imageArray[i]._id === image._id) index = i;
            if (index > -1) scope.imageArray.splice(index, 1);
          });
        });
        scope.$on('$destroy', function () {
          element.off('click');
        });
      });
    },
    scope: {
      imageArray: '=',
      text: '@'
    },
    template: '{{ text }}'
  };
}]);

app.directive('imageUpload', ['$upload', 'exists', function ($upload, exists) {
  return {
    link: function (scope, element, attributes) {
      if (!attributes.imageUpload) return;
      scope.save = scope.update = function ($files, opts) {
        for (var i = 0; i < $files.length; i++) {
          var file = $files[i];
          scope.upload = $upload.upload({
            data: {
              alt: scope.imageAlt || 'image',
              order: typeof scope.imageOrder !== 'undefined' ? scope.imageOrder : scope.imageArray.length
            },
            method: attributes.method || 'POST',
            url: attributes.imageUpload,
            file: file,
            fileFormDataName: 'image'
          }).success(function (data, status, headers, config) {
            if (!exists(data, 'messages', 0, 'value')) return;
            var index = -1
              , image = data.messages[0].value
              , i = scope.imageArray.length;
            while (i--) if (scope.imageArray[i]._id === image._id) index = i;
            if (!attributes.method || attributes.method === 'POST' || index === -1) return scope.imageArray.push(image);
            scope.imageArray.splice(index, 1, image);
          });
        }
      };
    },
    scope: {
      imageAlt: '=',
      imageArray: '=',
      imageOrder: '=',
      text: '@'
    },
    template: '{{ text }}<input type="file" data-ng-file-select="save($files)">'
  };
}]);

/**
 * Image fieldset
 *
 * @param {array} attributes.imageFieldset - array in parent scope that contains images
 * @param {number} attributes.imageHeight - height of images that should be returned
 * @param {number} attributes.imageWidth - width of images that should be returned
 * @param {boolean} [attributes.imageHighDpi=true] - will double the value of height and width if screen is high-resolution
 * @param {array} attributes.path - api path of image
 */
app.directive('imageFieldset', function () {
  return {
    link: function (scope, element, attributes) {
      scope.opts = { // move static attributes to scope
        height: attributes.imageHeight,
        highDpi: attributes.imageHighDpi,
        width: attributes.imageWidth
      };
      scope.order = function (index, id) {
        var i = scope.imageFieldset.length;
        while (i--) if (scope.imageFieldset[i]._id === id) scope.imageFieldset[i].order = index;
        return index;
      };
    },
    scope: {
      imageAlt: '=',
      imageFieldset: '=',
      imageMultiple: '@',
      parentRoot: '@',
      parentSlug: '='
    },
    templateUrl: '/app/views/directives/image-fieldset.html'
  };
});

/*------------------------------------*\
    SNIPPET DIRECTIVES
\*------------------------------------*/

app.directive('snippet', ['head', 'slug', 'Snippet', function (head, slug, Snippet) {
  return {
    link: function (scope, element, attributes) {
      var snippet = scope.snippet = Snippet.get({ snippet: slug(attributes.snippet) });
      snippet.$promise.then(function () {
        if (typeof attributes.snippetSetDescription !== 'undefined') head.setDescription(snippet.body);
      }).catch(function (err) {
        scope.snippet = { body: 'Snippet not found.' };
      });
    },
    scope: true,
    template: '{{ snippet.body }}'
  };
}]);
