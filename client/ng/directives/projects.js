'use strict';

var app = angular.module('mjbondra.directives.projects', []);

app.directive('projects', ['$document', '$location', '$window', 'api', 'Consolator', 'consoleStyles', 'projectStyles', 'send', function ($document, $location, $window, api, Consolator, consoleStyles, projectStyles, send) {
  return {
    link: function (scope, element, attributes) {
      var c = new Consolator()
        , head = $document.find('head')
        , style = angular.element('<style type="text/css"></style>');

      api('/api/projects').success(function (projects) {
        scope.projects = projects;
        style.text(projectStyles(projects));
        head.prepend(style);

        // if ($window.clear) $window.clear();
        // else if ($window.console && $window.console.clear) $window.console.clear();

        c.log(c.css(consoleStyles.h2, 'A D D I T I O N A L   P R O J E C T S'));
        c.log(
          c.css(consoleStyles.h3, '  Consolator  ') +
          c.css(consoleStyles.tags, '  Node.js    Gulp.js  ')
        );
        c.log(
          c.css(consoleStyles.description, 'A JavaScript library for printing styled messages to the console.  ') +
          c.css(consoleStyles.link, 'https://github.com/mjbondra/consolator')
        );

        c.log(
          c.css(consoleStyles.h3, '  mjbondra.com  ') +
          c.css(consoleStyles.tags, '  Node.js    Koa    AngularJS    MongoDB    Mongoose    Gulp.js  ')
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

      }).error(function (err) {
        scope.projects = [];
      });
    },
    scope: true,
    templateUrl: '/ng/views/projects/index.html'
  };
}]);
