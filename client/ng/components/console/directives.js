'use strict';

var angular = require('angular')
  , app = angular.module('mjbondra.components.console.directives', []);

app.directive('console', ['$location', '$window', 'Consolator', 'consoleStyles', 'send', function ($location, $window, Consolator, consoleStyles, send) {
  return {
    link: function () {
      var c = new Consolator();
      $window.send = send;
      $window.setTimeout(function () {
        c.log(c.css(consoleStyles.h2, 'A D D I T I O N A L   P R O J E C T S'));
        c.log(
          c.css(consoleStyles.h3, '  Consolator  ') +
          c.css(consoleStyles.tags, '  Node.js    gulp.js  ')
        );
        c.log(
          c.css(consoleStyles.description, 'A JavaScript library for printing styled messages to the console.  ') +
          c.css(consoleStyles.link, 'https://github.com/mjbondra/consolator')
        );

        c.log(
          c.css(consoleStyles.h3, '  mjbondra.com  ') +
          c.css(consoleStyles.tags, '  Node.js    Koa    AngularJS    MongoDB    Mongoose    gulp.js  ')
        );
        c.log(
          c.css(consoleStyles.description, 'You are here.  ') +
          c.css(consoleStyles.link, 'https://github.com/mjbondra/mjbondra.com')
        );

        c.log(
          c.image($location.protocol() + '://' + $location.host() + ($location.port() === '80' ? '' : ':' + $location.port()) + '/img/bg/mjbondra.png', {
            height: 125,
            width: 150,
            fallback: c.css(consoleStyles.imageFallback, 'Use Chrome to see console images.  '),
            post: false
          }) + c.css(consoleStyles.message, 'Thanks for visiting! Are you working on an interesting project? Contact me, and let\'s collaborate.')
        );
        c.log(c.css(consoleStyles.message, 'Send me a message. Type: send("message", "your email address")'));
      }, 2000);
    }
  };
}]);
