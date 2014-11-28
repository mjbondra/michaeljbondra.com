'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.projects.services', []);

app.factory('projectThumbnailStyles', [
  'wrapMediaQuery',
  'wrapSelector',
  function (wrapMediaQuery, wrapSelector) {
    return function (projects) {
      var css = {
        highResolution: '',
        lowResolution: ''
      };

      var i = projects.length;
      while (i--) {
        var color = projects[i].color
          , thumb = projects[i].image.thumbnail
          , selector = '.link--' + projects[i].slug;

        var rules = {
          lowResolution: [],
          highResolution: []
        };

        rules.lowResolution.push('background-color:' + color);

        if (thumb.lowResolution)
          rules.lowResolution.push(
            'background-image:url(\'' + thumb.lowResolution + '\')'
          );
        if (thumb.highResolution)
          rules.highResolution.push(
            'background-image:url(\'' + thumb.highResolution + '\')'
          );

        if (rules.lowResolution.length)
          css.lowResolution += wrapSelector(selector, rules.lowResolution);
        if (rules.highResolution.length)
          css.highResolution += wrapSelector(selector, rules.highResolution);
      }

      css.highResolution = wrapMediaQuery('highResolution', css.highResolution);
      return css.lowResolution + css.highResolution;
    };
  }
]);
