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

function js (name) {
  var bundler = browserify({
    entries: ['./client/ng/' + name],
    debug: true
  });
  return bundle(bundler, name);
}
function jsApp () {
  return js('mjbondra.app.js');
}
function jsLibraries () {
  return js('mjbondra.libraries.js');
}
function jsAll () {
  jsApp();
  jsLibraries();
}

gulp.task('js', jsAll);
gulp.task('js-app', jsApp);
gulp.task('js-libraries', jsLibraries);
gulp.task('js-install', ['bower'], jsAll);
