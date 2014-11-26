var gulp = require('gulp')
  , fs = require('fs')
  , gulpif = require('gulp-if')
  , rename = require('gulp-rename');

function config () {
  gulp.src('./server/config/config.default.js')
    .pipe(gulpif(
      !fs.existsSync('./server/config/config.js'),
      rename('config.js'))
    )
    .pipe(gulp.dest('./server/config/'));
}

gulp.task('config', config);
