'use strict';

var app = angular.module('mjbondra.services.project-styles', []);

app.constant('breakpoints', {
  mobileWide: 30, // em; 480px
  tablet: 48.0625, // em; 768px
  desktop: 64.0625 // em; 1025px
});

/**
 * Project Background (CSS styles)
 *
 * @param {array} projects - an array of project objects
 * @return {string} - css styles as a one-line string
 */
app.factory('projectStyles', ['breakpoints', function (breakpoints) {
  var selectorWrap = function (selector, rules) {
    return selector + ' { ' + rules.join('; ') + '; }';
  };
  return function (projects) {
    projects = projects || [];
    if (projects.length === 0) return '';
    var i = projects.length
      , css = {
          default: '',
          mobileWide: '',
          tablet: '',
          desktop: ''
        };

    while(i--) {
      if (projects[i].background && projects[i].slug) {
        var bg = projects[i].background
          , rules = []
          , slug = projects[i].slug;

        if (bg.color) rules.push('background-color: ' + bg.color);
        if (bg.image) {
          var images = bg.image;
          if (images.global) rules.push('background-image: url("' + images.global + '")');
          if (images.mobileWide) {
            css.mobileWide += ( css.mobileWide ? ' ' : '' );
            css.mobileWide += selectorWrap('.project-' + slug + ':before, .project-' + slug + ':after', ['background-image: url("' + images.mobileWide + '")']);
          }
          if (images.tablet) {
            css.tablet += ( css.tablet ? ' ' : '' );
            css.tablet += selectorWrap('.project-' + slug + ':before, .project-' + slug + ':after', ['background-image: url("' + images.tablet + '")']);
          }
          if (images.desktop) {
            css.desktop += ( css.desktop ? ' ' : '' );
            css.desktop += selectorWrap('.project-' + slug + ':before, .project-' + slug + ':after', ['background-image: url("' + images.desktop + '")']);
          }
          css.default += ( css.default ? ' ' : '' ) + selectorWrap('.project-' + slug + ':before, .project-' + slug + ':after', rules);
        }
      }
    }
    if (css.default) css.default += ' ';
    if (css.mobileWide) css.mobileWide = '@media (min-width: ' + breakpoints.mobileWide + 'em) { ' + css.mobileWide + ' } ';
    if (css.tablet) css.tablet = '@media (min-width: ' + breakpoints.tablet + 'em) { ' + css.tablet + ' } ';
    if (css.desktop) css.desktop = '@media (min-width: ' + breakpoints.desktop + 'em) { ' + css.desktop + ' }';

    return css.default + css.mobileWide + css.tablet + css.desktop;
  };
}]);
