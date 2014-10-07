var gulp = require('gulp')
  , bower = require('gulp-bower')
  , browserify = require('gulp-browserify')
  , compass = require('gulp-compass')
  , csso = require('gulp-csso')
  , plumber = require('gulp-plumber')
  , rename = require('gulp-rename')
  , uglify = require('gulp-uglify');

gulp.task('bower', function () {
  return bower()
    .pipe(gulp.dest('./client/lib/'));
});

gulp.task('browserify', ['bower'], function () {
  gulp.src('./client/ng/*.js')
    .pipe(plumber())
    .pipe(browserify())
    .pipe(gulp.dest('./client/js/'))
    .pipe(rename(function (path) { path.basename += '.min'; }))
    .pipe(uglify({ outSourceMap: true }))
    .pipe(gulp.dest('./client/js/'));
});

gulp.task('compass', ['bower'], function () {
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
    .pipe(gulp.dest('./client/css/'));
});

gulp.task('watch', function () {
  gulp.watch(['./client/ng/*.js', './client/ng/**/*.js'], ['browserify']);
  gulp.watch(['./client/scss/*.scss', './client/scss/**/*.scss'], ['compass']);
});

gulp.task('default', ['bower', 'browserify', 'compass']);
