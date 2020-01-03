'use strict';
const gulp         = require('gulp');

gulp.task('default', function(cb) {
  gulp.series(
    'build:dev',
    'server',
    'watch'
  )(cb);
});
