
/**
 * Extends caja-sanitizer to include additional sanitizers from validator.js
 */

var sanitize = require('sanitizer')
  , validate = require('validator');

/**
 * Extend replace function to return empty strings when passed an undefined parameter
 *
 * @param {string} str - string to sanitize
 * @param {boolean} alt - if set to true, validator.js escape method will be used instead of caja
 * @return {string} - sanitized string
 */
sanitize.escape = function (str, alt) {
  if (!str) return ''; // return empty string
  return alt ? validate.escape(str) : sanitize.escapeAttrib(str);
};

sanitize.toString = function (str) { return validate.toString(str); };
sanitize.toDate = function (str) { return validate.toDate(str); };
sanitize.toFloat = function (str) { return validate.toFloat(str); };
sanitize.toInt = function (str, radix) { return validate.toInt(str, radix); };
sanitize.toBoolean = function (str, strict) { return validate.toBoolean(str, strict); };
sanitize.trim = function (str, chars) { return validate.trim(str, chars); };
sanitize.ltrim = function (str, chars) { return validate.ltrim(str, chars); };
sanitize.rtrim = function (str, chars) { return validate.rtrim(str, chars); };
sanitize.whitelist = function (str, chars) { return validate.whitelist(str, chars); };
sanitize.blacklist = function (str, chars) { return validate.blacklist(str, chars); };

/**
 * Sanitize repeating parameters within an array of objects
 *
 * @param {array} arr - array of objects
 * @param {object} keypairs - an object containing sanitizer methods as keys, and objects keys as values
 * @param {object} opts - an object containing options
 * @return {array} an array of objects that have been sanitized
 */
sanitize.array = function (arr, keypairs, opts) {
  arr = !arr instanceof Array ? typeof arr !== 'undefined' ? [ arr ] : [] : arr;
  keypairs = keypairs || {};
  opts = opts || {};
  var blacklist = ['array']
    , keys = Object.keys(keypairs)
    , k = keys.length;
  while (k--) if (!!sanitize[keys[k]] && blacklist.indexOf(keys[k]) === -1) {
    keypairs[keys[k]] = keypairs[keys[k]] instanceof Array ? keypairs[keys[k]] : [keypairs[keys[k]]];
    var i = keypairs[keys[k]].length;
    while (i--) {
      var ii = arr.length;
      while (ii--)
        if (arr[ii][keypairs[keys[k]][i]]) arr[ii][keypairs[keys[k]][i]] = sanitize[keys[k]](arr[ii][keypairs[keys[k]][i]]);
        else if (opts.splice) arr.splice(ii, 1);
    }
  }
  return arr;
};

module.exports = sanitize;
