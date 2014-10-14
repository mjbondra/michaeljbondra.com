var gulp = require('gulp')
  , bower = require('bower')
  , notify = require('gulp-notify');

gulp.task('bower', function (cb) {
  bower.commands.install([], { save: true }, {})
    .on('end', function (installed) {
      cb(); // notify gulp that this task is finished
    });
});
