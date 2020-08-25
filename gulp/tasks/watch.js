'use strict';
const gulp           = require('gulp');


gulp.task('watch', cb => {
  gulp.parallel(
    'sass:watch',
    'data:watch',
    'nunjucks:watch',
    'webpack:watch',
    'imagemin:watch',
    'copy:watch',
    'pagelist:watch'
  )(cb);
});
