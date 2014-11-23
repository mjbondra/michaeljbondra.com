var gulp = require('gulp')
  , notify = require('gulp-notify')
  , plumber = require('gulp-plumber')
  , sass = require('gulp-ruby-sass')
  , sourcemaps = require('gulp-sourcemaps');

function css () {
  return sass('./client/scss/styles.scss', {
      loadPath: './client/scss',
      require: 'sass-globbing',
      sourcemap: true,
      style: 'compressed'
    })
    .pipe(plumber())
    .pipe(sourcemaps.write({
      includeContent: false,
      sourceRoot: '/scss'
    }))
    .pipe(gulp.dest('./client/css/'))
    .pipe(notify('CSS was successfully compiled.'));
}

gulp.task('css', css);
gulp.task('css-install', ['bower'], css);
