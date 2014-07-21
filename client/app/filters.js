'use strict';

var app = angular.module('mjbondra.filters', []);

/**
 * Decode html entities filter
 */
app.filter('htmlDecode', ['$window', function ($window) {
  return function (input) {
    input = input || '';
    var txt = $window.document.createElement("textarea");
    txt.innerHTML = input;
    return txt.value;
  };
}]);

/**
 * Trust-as-html filter
 */
app.filter('htmlRender', ['$sce', function ($sce) {
  return function (input) {
    input = input || '';
    return $sce.trustAsHtml(input);
  };
}]);

/**
 * Image selection filter
 *
 * @param {array} input - array that contains image objects
 * @param {number} opts.height - height of images that should be returned
 * @param {number} otps.width - width of images that should be returned
 * @param {boolean} [opts.highDpi=true] - will double the value of height and width if screen is high-resolution
 * @return {array} - an array of images that match the given set of options
 */
app.filter('imageFilter', ['highDpi', function (highDpi) {
  return function (input, opts, attribute) {
    if (!input || !input.files) return;
    opts = opts || [];
    attribute = attribute || 'src';
    var _opts = {}
      , files = input.files
      , i = files.length;
    _opts.highDpi = opts.highDpi === false ? false : highDpi();
    _opts.height = opts.height ? _opts.highDpi ? opts.height * 2 : parseInt(opts.height) : false;
    _opts.width = opts.width ? _opts.highDpi ? opts.width * 2 : parseInt(opts.width) : false;
    while (i--) if ((_opts.width && !_opts.height && files[i].geometry.width === _opts.width) ||
      (_opts.width && _opts.height && files[i].geometry.width === _opts.width && files[i].geometry.height === _opts.height) ||
      (_opts.height && !_opts.width && files[i].geometry.height === _opts.height)) return files[i][attribute];
    return '';
  };
}]);

/**
 * Format title
 *
 * @param {string} input - raw title
 * @return {string} - page title
 */
app.filter('pageTitle', function () {
  return function (input) {
    var globalTitle = 'Michael J. Bondra';
    return ( input ? input + ' | ' : '' ) + globalTitle;
  };
});

/**
 * Summarization filter
 *
 * @param {string} input - text
 * @return {string} - trucated text
 */
app.filter('summarize', function () {
  return function (input, maxLength) {
    input = input || '';
    maxLength = maxLength || 160;
    if (input.length <= maxLength) return input;
    input = String(input).substring(0, maxLength);
    var output = String(input).match(/.*[\.\?\!]/);
    if (output && output[0]) return output[0];
    return input;
  };
});
