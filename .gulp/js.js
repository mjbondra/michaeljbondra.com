var gulp = require('gulp')
  , browserify = require('browserify')
  , buffer = require('vinyl-buffer')
  , notify = require('gulp-notify')
  , plumber = require('gulp-plumber')
  , source = require('vinyl-source-stream')
  , sourcemaps = require('gulp-sourcemaps')
  , uglify = require('gulp-uglify');

function bundle (bundler, name) {
  return bundler
    .bundle()
    .pipe(plumber())
    .pipe(source(name))
    .pipe(buffer())
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
  return js('app.js');
}

gulp.task('js', jsApp);
gulp.task('js-install', ['bower'], jsApp);
