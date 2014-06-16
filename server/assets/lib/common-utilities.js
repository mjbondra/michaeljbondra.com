
/**
 * A collection of common utilities
 */

/**
 * Module dependencies
 */
var isset = require('./utilities/isset')
  , msg = require('../../config/messages')
  , slug = require('./utilities/slug')
  , _ = require('underscore');

module.exports = {

  /*------------------------------------*\
      FILTERS & MODIFIERS
  \*------------------------------------*/

  /**
   * Censor arrays and single instances of Mongoose-modeled documents
   *
   * Prevents the inclusion of ids, versions, salts, and hashes
   *
   * @param {object|array} obj - Mongoose-modeled document(s)
   * @param {array|string} [keys=_id] - an array of keys to omit
   * @returns {object|array} - censored version of Mongoose-modeled document(s)
   */
  censor: function *(obj, keys) {
    if (typeof obj !== 'object') return obj;
    var _obj, i;
    if (obj instanceof Date) return obj;
    else if (Array.isArray(obj)) { // is Object Array
      _obj = [];
      i = obj.length;
      while(i--) _obj.push(yield this.censor(obj[i], keys));
    } else { // is Object
      _obj = _.omit(obj && obj._doc ? obj._doc : obj, keys || '_id');
      var _objKeys = Object.keys(_obj);
      i = _objKeys.length;
      while(i--) _obj[_objKeys[i]] = yield this.censor(_obj[_objKeys[i]], keys);
    }
    return _obj;
  },

  /**
   * Service that checks for the existence of nested keys
   *
   * source: http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-nested-object-key#2631198
   * usage: isset(object, 'key 1', 'key 2', ... 'key n')
   */
  isset: isset,

  /**
   * Convert string to slug
   *
   * @param {string} str - string to convert
   * @param {boolean} strip - removes non-word characters; do not replace with '-'
   * @returns {string} - slug
   */
  slug: slug,

  /*------------------------------------*\
      JSON MESSAGE FUNCTIONS
  \*------------------------------------*/

  /**
   * Creates a single JSON-ready message-containing object
   *
   * Pairs a message with other relevant identifiers and data
   *
   * @param {string} [message] - message to be passed to client
   * @param {string} [type] - type of message
   * @param {string} [related] - related field or value-type
   * @param {string|object|array} [value] - relavent value related to message
   * @returns {object} - a JSON-ready object that contains a message along with relevant identifiers and data
   */
  msg: function (message, type, related, value) {
    var msgObj = {};
    if (message) msgObj.message = message;
    if (type) msgObj.type = type;
    if (related) msgObj.related = related;
    if (typeof value !== 'undefined') msgObj.value = value; // value can be boolean
    return msgObj;
  },

  /**
   * Response handler for JSON-ready message objects
   *
   * Accepts an array of objects returned by msgJSON()
   *
   * @param {array} msgJSONArray - an array of message-containing objects, ideally created individually by msgJSON()
   * @returns {object} - a response-ready JSON object that can be passed directly to this.body
   */
  body: function (msgJSONArray) {
    if (!msgJSONArray) return {};
    return { messages: !Array.isArray(msgJSONArray) ? [ msgJSONArray ] : msgJSONArray };
  },

  /*------------------------------------*\
      CRUD RESPONSE FUNCTIONS
  \*------------------------------------*/

  /**
   * Response handler for successfully added content
   *
   * @param {string} contentType - content-type name
   * @param {object} mongooseDoc - Mongoose-modeled document
   * @param {string} [title] - value by which content is known, addressed, or referred
   * @param {array} blacklist - list of keys to censor
   * @returns {object} - a response-ready JSON object that can be passed directly to this.body
   */
  created: function *(contentType, mongooseDoc, title, blacklist) {
    blacklist = blacklist || [];
    title = title || mongooseDoc.title;
    return this.body(this.msg(msg[contentType].created(title), 'success', contentType, yield this.censor(mongooseDoc, blacklist)));
  },
  updated: function *(contentType, mongooseDoc, title, blacklist) {
    blacklist = blacklist || [];
    title = title || mongooseDoc.title;
    return this.body(this.msg(msg[contentType].updated(title), 'success', contentType, yield this.censor(mongooseDoc, blacklist)));
  },
  deleted: function *(contentType, mongooseDoc, title, blacklist) {
    blacklist = blacklist || [];
    title = title || mongooseDoc.title;
    return this.body(this.msg(msg[contentType].deleted(title), 'success', contentType, yield this.censor(mongooseDoc, blacklist)));
  }
};
