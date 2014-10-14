var gulp = require('gulp')
  , compass = require('gulp-compass')
  , csso = require('gulp-csso')
  , notify = require('gulp-notify')
  , plumber = require('gulp-plumber')
  , rename = require('gulp-rename')
  , sass = require('gulp-ruby-sass');

require('./.gulp/bower'); //  task(s):  bower
require('./.gulp/css');   //  task(s):  css, css-install
require('./.gulp/js');    //  task(s):  js, js-app, js-libraries, js-install

gulp.task('watch', function () {
  gulp.watch(['./client/ng/*.js', './client/ng/**/*.js'], ['js-app']);
  gulp.watch(['./client/scss/*.scss', './client/scss/**/*.scss'], ['css']);
});

gulp.task('default', ['css', 'js']);
gulp.task('install', ['bower', 'css-install', 'js-install']);
