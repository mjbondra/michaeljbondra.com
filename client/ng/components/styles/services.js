'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.styles.services', []);

/**
 * Media query wrapper service
 *
 * ex. wrapMedia('highResolution', '.foobar{color:red}');
 * ex. wrapMedia('tablet', '.foobar{color:red}')
 *
 * @param  {string} type - media query type
 * @param  {string} css  - css styles
 * @return {string}      - media query wrapped css styles
 */
app.factory('wrapMedia', [function () {
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

    return mediaQuery + '{' + css + '}';
  };
}]);

/**
 * Project Background (CSS styles)
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
