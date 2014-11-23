var autoprefixer = require('autoprefixer-core')
  , gulp = require('gulp')
  , notify = require('gulp-notify')
  , plumber = require('gulp-plumber')
  , postcss = require('gulp-postcss')
  , sass = require('gulp-ruby-sass')
  , sourcemaps = require('gulp-sourcemaps');

function css () {
  var processors = [
    autoprefixer({
      browsers: ['> 1%']
    })
  ];
  return sass('./client/scss/styles.scss', {
      loadPath: './client/scss',
      require: 'sass-globbing',
      sourcemap: true
    })
    .pipe(plumber())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write({
      includeContent: false,
      sourceRoot: '/scss'
    }))
    .pipe(gulp.dest('./client/css/'))
    .pipe(notify('CSS was successfully compiled.'));
}

gulp.task('css', css);
gulp.task('css-install', ['bower'], css);
