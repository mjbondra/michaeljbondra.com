var gulp = require('gulp');

require('./.gulp/bower'); //  task(s):  bower
require('./.gulp/css');   //  task(s):  css, css-install
require('./.gulp/js');    //  task(s):  js, js-app, js-libraries, js-install

gulp.task('watch', function () {
  gulp.watch(['./bower.json'], ['bower']);
  gulp.watch(['./client/ng/*.js', './client/ng/**/*.js'], ['js-app']);
  gulp.watch(['./client/scss/*.scss', './client/scss/**/*.scss'], ['css']);
});

gulp.task('default', ['css', 'js']);
gulp.task('install', ['bower', 'css-install', 'js-install']);
