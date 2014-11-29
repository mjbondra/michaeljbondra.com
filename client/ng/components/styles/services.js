'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.styles.services', []);

/**
 * Hex-to-RGBA
 *
 * ex. hexToRgba('#333333', 0.5);
 *
 * @param  {string} hex     - media query type
 * @param  {number} opacity - css styles
 * @return {string}         - media query wrapped css styles
 */
app.factory('hexToRgba', [function () {
  return function (hex, opacity) {
    opacity = opacity || 1;
    var matches = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return matches ? {
      r: parseInt(matches[1], 16),
      g: parseInt(matches[2], 16),
      b: parseInt(matches[3], 16),
      a: opacity,
      toString: function () {
        return 'rgba(' +
          this.r + ',' +
          this.b + ',' +
          this.g + ',' +
          this.a + ')';
      }
    } : null;
  };
}]);

/**
 * CSS media query wrapper
 *
 * ex. wrapMedia('highResolution', '.foobar{color:red}');
 * ex. wrapMedia('tablet', '.foobar{color:red}')
 *
 * @param  {string} type - media query type
 * @param  {string} css  - css styles
 * @return {string}      - media query wrapped css styles
 */
app.factory('wrapMediaQuery', [function () {
  return function (type, css) {
    var breakpoint = {
      mobileWide: 30, // em; 480px
      tablet: 48, // em; 768px
      desktop: 64.0625 // em; 1025px
    };

    var highResolution = [
      '(min-resolution: 1.3dppx)',
      '(-webkit-min-device-pixel-ratio: 1.3)',
      '(min--moz-device-pixel-ratio: 1.3)',
      '(min-resolution: 124.8dpi)'
    ];

    var actions = {
      breakpoint: function (name) {
        return '(min-width:' + breakpoint[name] + 'em)';
      },
      highResolution: function () {
        return highResolution.join(',');
      }
    };

    var mediaQuery = '@media';
    if (typeof actions[type] === 'function')
      mediaQuery += actions[type]();
    else if (typeof breakpoint[type] === 'number')
      mediaQuery += actions.breakpoint(type);
    else return css;

    return mediaQuery + '{' + css + '}';
  };
}]);

/**
 * CSS selector wrapper
 *
 * ex. wrapSelector('.foobar', ['color:red','font-size:1.6rem']);
 *
 * @param  {string} selector - css selector
 * @param  {array}  rules    - an array of css rule strings
 * @return {string}          - selector wrapped css rules
 */
app.factory('wrapSelector', [function () {
  return function (selector, rules) {
    return selector + '{' + rules.join(';') + '}';
  };
}]);
