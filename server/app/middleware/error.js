
/**
 * Module dependencies
 */
var mongoose = require('mongoose')
  , Promise = require('bluebird')
  , _ = require('underscore');

/**
 * Error model
 */
var Schema = mongoose.Schema
  , ErrorSchema = new Schema({
    method: String,
    params: Object,
    referer: String,
    stack: String,
    status: Number,
    url: String,
    user: {
      type : Schema.ObjectId,
      ref : 'User'
    },
    userIP: String
  }), _Error = mongoose.model('Error', ErrorSchema);

module.exports = function () {
  return function *(next) {
    try {
      yield next;

    // error handling for downstream middleware
    } catch (err) {

    }
  };
};
