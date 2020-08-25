'use strict';
const gulp = require('gulp');

gulp.task('default', (cb) => {
  gulp.series(
    'build:dev',
    'server',
    'watch',
  )(cb);
});
