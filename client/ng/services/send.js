'use strict';

var app = angular.module('mjbondra.services.send', []);

/**
 * Send Service
 *
 * @param {string} body - message body
 * @param {string} email - sender email
 * @return {string} - response
 */
app.factory('send', ['$window', 'api', 'Consolator', 'consoleStyles', function ($window, api, Consolator, consoleStyles) {
  var c = new Consolator();
  var send = $window.send = function (body, email) {
    if (!body) return;
    email = email || '';
    api('/api/messages', 'POST', { body: body, email: email }).success(function () {
      c.log(c.css(consoleStyles.message, 'Thanks! Your message was sent.'));
    }).error(function () {
      c.log(c.css(consoleStyles.messageError, 'Sorry, there was an error when we tried to send your message.'));
    });
    return 'Sending message...';
  };
  return send;
}]);
