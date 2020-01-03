'use strict';
const gulp           = require('gulp');




gulp.task('watch', cb => {
  gulp.parallel(
    'inline-svg:watch',
    'sass:watch',
    'data:watch',
    'nunjucks:watch',
    'webpack:watch',
    'imagemin:watch',
    'copy:watch',
    'pagelist:watch'
  )(cb);
});
