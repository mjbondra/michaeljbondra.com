var gulp = require('gulp');

require('./.gulp/bower'); //  task(s):  bower
require('./.gulp/css');   //  task(s):  css, css-minify, css-install, css-install-minify
require('./.gulp/js');    //  task(s):  js, js-install

gulp.task('watch', function () {
  gulp.watch(['./bower.json'], ['bower']);
  gulp.watch(['./client/ng/*.js', './client/ng/**/*.js'], ['js']);
  gulp.watch(['./client/scss/*.scss', './client/scss/**/*.scss'], ['css-minify']);
});

gulp.task('default', ['css-minify', 'js']);
gulp.task('install', ['bower', 'css-install-minify', 'js-install']);
