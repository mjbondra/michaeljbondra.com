'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.projects.services', []);

app.factory('projectThumbnailStyles', [
  'wrapMediaQuery',
  'wrapSelector',
  function (wrapMediaQuery, wrapSelector) {
    return function (projects) {
      var css = {
        colorMask: '',
        highResolution: '',
        lowResolution: ''
      };

      var i = projects.length;
      while (i--) {
        var color = projects[i].color
          , selector = '.link--' + projects[i].slug
          , thumb = projects[i].image.thumbnail;

        var rules = {
          colorMask: [],
          highResolution: [],
          lowResolution: []
        };

        if (color)
          rules.colorMask.push(
            'background-color:' + color
          );
        if (thumb.repeat)
          rules.lowResolution.push(
            'background-size:auto auto!important'
          );
        if (thumb.lowResolution)
          rules.lowResolution.push(
            'background-image:url(\'' + thumb.lowResolution + '\')'
          );
        if (thumb.highResolution)
          rules.highResolution.push(
            'background-image:url(\'' + thumb.highResolution + '\')'
          );

        if (rules.colorMask.length)
          css.colorMask += wrapSelector(selector + ':before', rules.colorMask);
        if (rules.lowResolution.length)
          css.lowResolution += wrapSelector(selector, rules.lowResolution);
        if (rules.highResolution.length)
          css.highResolution += wrapSelector(selector, rules.highResolution);
      }

      css.highResolution = wrapMediaQuery('highResolution', css.highResolution);
      return css.colorMask + css.lowResolution + css.highResolution;
    };
  }
]);
