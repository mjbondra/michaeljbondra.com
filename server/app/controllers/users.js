
/**
 * Module dependencies.
 */
var coBody = require('co-body')
  , cU = require('../../assets/lib/common-utilities')
  , mongoose = require('mongoose')
  , msg = require('../../config/messages')
  , Promise = require('bluebird')
  , _ = require('underscore');

module.exports = {
  update: function *(next) {
    yield next;
  },
  sessions: {
    show: function *(next) {
      yield next;
    },
    create: function *(next) {
      yield next;
    },
    update: function *(next) {
      yield next;
    },
    destroy: function *(next) {
      yield next;
    }
  }
};
