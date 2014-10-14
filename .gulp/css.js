var gulp = require('gulp')
  , csso = require('gulp-csso')
  , filter = require('gulp-filter')
  , notify = require('gulp-notify')
  , plumber = require('gulp-plumber')
  , rename = require('gulp-rename')
  , sass = require('gulp-ruby-sass');

function css () {
  return gulp.src('./client/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      require: 'sass-globbing'
    }))
    .pipe(gulp.dest('./client/css/'))
    .pipe(filter(['*', '!*.map']))
    .pipe(rename(function (path) { path.basename += '.min'; }))
    .pipe(csso())
    .pipe(gulp.dest('./client/css/'))
    .pipe(notify('CSS was successfully compiled.'));
}

gulp.task('css', css);
gulp.task('css-install', ['bower'], css);
