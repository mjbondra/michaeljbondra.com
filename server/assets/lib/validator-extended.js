/**
 * Extends validator.js to include additional validators
 */

var validator = require('validator');

validator.notNull = function (str) {
  str = str || '';
  return str.length !== 0;
};

module.exports = validator;
