'use strict';

var angular = require('angular')
  , app = angular.module('componentsProjectsServices', []);

app.factory('projectPageStyles', [
  'hexToRgba',
  'wrapMediaQuery',
  'wrapSelector',
  function (hexToRgba, wrapMediaQuery, wrapSelector) {
    return function (project) {
      var background = project.image.background
        , color = project.color;

      var css = {
        colorMask: '',
        desktop: '',
        desktopWide: '',
        mobile: '',
        mobileWide: '',
        tablet: ''
      };

      var rules = {
        colorMask: [],
        desktop: [],
        desktopWide: [],
        mobile: [],
        mobileWide: [],
        tablet: []
      };

      var selector = {
        details: '.project--details',
        page: '.article--projects:before'
      };

      if (color)
        rules.colorMask.push(
          'background-color:' + hexToRgba(color, 0.2)
        );
      if (background.mobile)
        rules.mobile.push(
          'background-image:url(\'' + background.mobile + '\')'
        );
      if (background.mobileWide)
        rules.mobileWide.push(
          'background-image:url(\'' + background.mobileWide + '\')'
        );
      if (background.tablet)
        rules.tablet.push(
          'background-image:url(\'' + background.tablet + '\')'
        );
      if (background.desktop)
        rules.desktop.push(
          'background-image:url(\'' + background.desktop + '\')'
        );
      if (background.repeat)
        rules.desktopWide.push(
          'background-size:auto auto!important'
        );

      if (rules.colorMask.length)
        css.colorMask = wrapSelector(selector.details, rules.colorMask);
      if (rules.mobile.length)
        css.mobile = wrapSelector(selector.page, rules.mobile);
      if (rules.mobileWide.length)
        css.mobileWide = wrapSelector(selector.page, rules.mobileWide);
      if (rules.tablet.length)
        css.tablet = wrapSelector(selector.page, rules.tablet);
      if (rules.desktop.length)
        css.desktop = wrapSelector(selector.page, rules.desktop);
      if (rules.desktopWide.length)
        css.desktopWide = wrapSelector(selector.page, rules.desktopWide);

      return css.colorMask +
        css.mobile +
        wrapMediaQuery('mobileWide', css.mobileWide) +
        wrapMediaQuery('tablet', css.tablet) +
        wrapMediaQuery('desktop', css.desktop) +
        wrapMediaQuery('desktopWide', css.desktopWide);
    };
  }
]);

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
