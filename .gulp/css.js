var autoprefixer = require('autoprefixer-core')
  , csswring = require('csswring')
  , gulp = require('gulp')
  , notify = require('gulp-notify')
  , plumber = require('gulp-plumber')
  , postcss = require('gulp-postcss')
  , rename = require('gulp-rename')
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
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./client/css/'))
    .pipe(notify('CSS was successfully compiled.'));
}

function cssMinify () {
  var processors = [
    csswring({
      removeAllComments: true
    })
  ];
  return gulp.src('./client/css/styles.css', { base: './client' })
    .pipe(plumber())
    .pipe(rename(function (path) { path.basename += '.min'; }))
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(postcss(processors))
    .pipe(sourcemaps.write('./', {
      sourceRoot: '../'
    }))
    .pipe(gulp.dest('./client'))
    .pipe(notify('CSS was successfully minified.'));
}

gulp.task('css', css);
gulp.task('css-minify', ['css'], cssMinify);
gulp.task('css-install', ['bower'], css);
gulp.task('css-install-minify', ['css-install'], cssMinify);
