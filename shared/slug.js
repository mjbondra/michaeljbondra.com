/**
 * Convert string to slug
 *
 * @param {string} str - string to convert
 * @param {boolean} strip - removes non-word characters; do not replace with '-'
 * @returns {string} - slug
 */
module.exports = function (str, strip) {
  if (typeof str !== 'string') return '';
  str = str.toLowerCase();
  if (strip) str = str.replace(/[_]/g, '');
  else str = str.replace(/[ |_]/g, '-');
  return str.replace(/[^\w]+/g,'');
};
