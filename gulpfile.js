var gulp = require('gulp')
  , bower = require('gulp-bower')
  , compass = require('gulp-compass')
  , csso = require('gulp-csso')
  , notify = require('gulp-notify')
  , plumber = require('gulp-plumber')
  , rename = require('gulp-rename');

require('./.gulp/js'); // tasks: js, js-app, js-libraries


gulp.task('bower', function () {
  return bower()
    .pipe(gulp.dest('./client/lib/'));
});

gulp.task('compass', function () {
  gulp.src('./client/scss/*.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      css: 'client/css',
      environment: 'production',
      sass: 'client/scss',
      sourcemap: true
    }))
    .pipe(gulp.dest('./client/css/'))
    .pipe(rename(function (path) { path.basename += '.min'; }))
    .pipe(csso())
    .pipe(gulp.dest('./client/css/'))
    .pipe(notify('CSS was successfully compiled.'));
});

gulp.task('watch', function () {
  gulp.watch(['./client/ng/*.js', './client/ng/**/*.js'], ['js-app']);
  gulp.watch(['./client/scss/*.scss', './client/scss/**/*.scss'], ['compass']);
});

gulp.task('default', ['js', 'compass']);
