var gulp = require('gulp')
  , browserify = require('browserify')
  , buffer = require('vinyl-buffer')
  , notify = require('gulp-notify')
  , plumber = require('gulp-plumber')
  , rename = require('gulp-rename')
  , source = require('vinyl-source-stream')
  , sourcemaps = require('gulp-sourcemaps')
  , uglify = require('gulp-uglify');

function bundle (bundler, name) {
  return bundler
    .bundle()
    .pipe(plumber())
    .pipe(source(name))
    .pipe(buffer())
    .pipe(gulp.dest('./client/js/'))
    .pipe(rename(function (path) { path.basename += '.min'; }))
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./client/js/'))
    .pipe(notify('JS was successfully compiled.'));
}

function jsApp () {
  var bundler = browserify({
    entries: ['./client/ng/mjbondra.app.js'],
    debug: true
  });
  return bundle(bundler, 'mjbondra.app.js');
}
function jsLibraries () {
  var bundler = browserify({
    entries: ['./client/ng/mjbondra.libraries.js'],
    debug: true
  });
  return bundle(bundler, 'mjbondra.libraries.js');
}
function jsAll () {
  jsApp();
  jsLibraries();
}

gulp.task('js', jsAll);
gulp.task('js-app', jsApp);
gulp.task('js-libraries', jsLibraries);
gulp.task('js-install', ['bower'], jsAll);
