var gulp = require('gulp')
  , notify = require('gulp-notify')
  , plumber = require('gulp-plumber')
  , sass = require('gulp-ruby-sass');

function css () {
  return gulp.src('./client/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      require: 'sass-globbing',
      style: 'compressed'
    }))
    .pipe(gulp.dest('./client/css/'))
    .pipe(notify('CSS was successfully compiled.'));
}

gulp.task('css', css);
gulp.task('css-install', ['bower'], css);
