
/**
 * Object key existence utility
 */

/**
 * Service that checks for the existence of nested keys
 *
 * source: http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-nested-object-key#2631198
 * usage: exists(object, 'key 1', 'key 2', ... 'key n')
 */
module.exports = function () {
  var args = Array.prototype.slice.call(arguments)
    , obj = args.shift();
  for (var i = 0; i < args.length; i++) {
    if (!obj.hasOwnProperty(args[i])) return false;
    obj = obj[args[i]];
  }
  return true;
};
